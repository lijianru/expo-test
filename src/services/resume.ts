import { RESUME_STATUS } from '../client/Resume/enum';
import { ResumeDTO } from '../client/Resume/types';
import { useAppSelector } from '../hooks/useAppSelector';
import { createInterviewAction, updateInterviewAction } from '../slice/interviewActionSlice';
import { createResume } from '../slice/resumeSlice';
import { uuid } from '../utils/uuid';
import { InterviewActionVO, ResumeFormVO } from './../client/Resume/types';
import { useAppDispatch } from './../hooks/useAppDispatch';

export function useTodoResume(): ResumeDTO[] {
  const resumeList = useAppSelector(state => state.resume.resumeList);

  // 使用当前登陆用户的ID过滤出需要他处理的简历
  const currentUserId = useAppSelector(state => state.auth.auth.id);

  const interviewActionList = useAppSelector(state => state.interviewAction.interviewActionList);
  const interviewActionPendingList = interviewActionList.filter(
    ({ status, ownerIds }) => status === RESUME_STATUS.PENDING && ownerIds.includes(currentUserId)
  );
  const resumeIds = interviewActionPendingList.map(({ resumeId }) => resumeId);

  return resumeList.filter(resume => {
    if (resumeIds.includes(resume.id)) {
      return resume;
    }
  });
}

export function useUploadedByMeResume(): ResumeDTO[] {
  const resumeList = useAppSelector(state => state.resume.resumeList);

  // 使用当前登陆用户的ID过滤出需要他处理的简历
  const currentUserId = useAppSelector(state => state.auth.auth.id);

  return resumeList.filter(({ createdBy }) => createdBy === currentUserId);
}

export function useResume() {
  const dispatch = useAppDispatch();

  const todoResumeList = useTodoResume();
  const uploadedByMeResumeList = useUploadedByMeResume();
  const auth = useAppSelector(state => state.auth.auth);
  const interviewProcessList = useAppSelector(state => state.interviewProcess.interviewProcessList);

  const createNewResume = ({ notRecommendReason, ownerIds, ...rest }: ResumeFormVO) => {
    const resume: ResumeDTO = {
      id: uuid(),
      ...rest,
    };

    if (notRecommendReason) {
      dispatch(
        createResume({
          ...resume,
          closedDate: new Date().toISOString(),
        })
      );

      dispatch(
        createInterviewAction({
          id: uuid(),
          resumeId: resume.id,
          interviewProcessId: interviewProcessList[0].id,
          createdDate: new Date().toISOString(),
          comment: notRecommendReason,
          updatedBy: auth.id,
          ownerIds: [],
          status: RESUME_STATUS.UNAPPROVED,
        })
      );
    } else {
      dispatch(
        createResume({
          ...resume,
        })
      );

      dispatch(
        createInterviewAction({
          id: uuid(),
          resumeId: resume.id,
          interviewProcessId: interviewProcessList[0].id,
          createdDate: new Date().toISOString(),
          comment: '',
          ownerIds: [...ownerIds],
          updatedBy: '',
          status: RESUME_STATUS.PENDING,
        })
      );
    }
  };

  return {
    todoResumeList,
    uploadedByMeResumeList,
    createNewResume,
  };
}

export function useResumeDetailInfo(resumeId: string) {
  const resumeList = useAppSelector(state => state.resume.resumeList);
  const interviewActionList = useAppSelector(state => state.interviewAction.interviewActionList);
  const interviewProcessList = useAppSelector(state => state.interviewProcess.interviewProcessList);
  const userList = useAppSelector(state => state.user.userList);

  const currentResume = resumeList.find(({ id }) => id === resumeId);
  const currentInterviewActionList: InterviewActionVO[] = interviewActionList
    .filter(interviewAction => interviewAction.resumeId === resumeId)
    .map(interviewAction => {
      const interviewProcessName = interviewProcessList.find(
        ({ id }) => id === interviewAction.interviewProcessId
      )?.name;
      const ownerIdsUsername = userList
        .filter(({ id }) => {
          return interviewAction.ownerIds.includes(id);
        })
        .map(({ username }) => username);

      const updatedByUsername = userList.find(
        ({ id }) => id === interviewAction.updatedBy
      )?.username;

      const newInterviewAction: InterviewActionVO = {
        ...interviewAction,
        ownerIdsUsername,
        updatedByUsername,
        interviewProcessName,
      };

      return newInterviewAction;
    });

  return {
    ...currentResume,
    interviewActionList: currentInterviewActionList,
  };
}

export function useApproveResume(
  interviewActionId: string,
  resumeId: string,
  comment: string,
  ownerIds: string[]
) {
  // 根据interviewActionId查找当前轮次的面试记录并更新，然后创建下一轮次的记录
  const dispatch = useAppDispatch();

  const interviewActionList = useAppSelector(state => state.interviewAction.interviewActionList);
  const interviewProcessList = useAppSelector(state => state.interviewProcess.interviewProcessList);
  const auth = useAppSelector(state => state.auth.auth);

  const currentInterviewAction = interviewActionList.find(({ id }) => id === interviewActionId);
  const currentInterviewProcessId = currentInterviewAction?.interviewProcessId;

  const currentInterviewProcessIndex = interviewProcessList.findIndex(
    ({ id }) => id === currentInterviewProcessId
  );

  const nextInterviewProcess = interviewProcessList[currentInterviewProcessIndex + 1];

  const handleApproveResume = () => {
    if (currentInterviewAction) {
      dispatch(
        updateInterviewAction({
          ...currentInterviewAction,
          closedDate: new Date().toISOString(),
          updatedBy: auth.id,
          status: RESUME_STATUS.APPROVED,
        })
      );

      if (nextInterviewProcess) {
        dispatch(
          createInterviewAction({
            id: uuid(),
            resumeId: resumeId,
            interviewProcessId: nextInterviewProcess.id,
            createdDate: new Date().toISOString(),
            comment: '',
            ownerIds: [...ownerIds],
            updatedBy: '',
            status: RESUME_STATUS.PENDING,
          })
        );
      }
    } else {
      console.log('似乎出现了一些问题！');
    }
  };

  const handleUnApproveResume = () => {
    if (currentInterviewAction) {
      dispatch(
        updateInterviewAction({
          ...currentInterviewAction,
          comment,
          closedDate: new Date().toISOString(),
          updatedBy: auth.id,
          status: RESUME_STATUS.UNAPPROVED,
        })
      );
    } else {
      console.log('似乎出现了一些问题！');
    }
  };

  return {
    handleApproveResume,
    handleUnApproveResume,
  };
}
