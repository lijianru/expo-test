import { RESUME_STATUS } from '../client/Resume/enum';
import { ResumeDTO, ResumeVO } from '../client/Resume/types';
import { useAppSelector } from '../hooks/useAppSelector';
import { createInterviewAction } from '../slice/interviewActionSlice';
import { createResume } from '../slice/resumeSlice';
import { uuid } from '../utils/uuid';
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

  // TODO: 使用timeline中状态为pending的action查找简历
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
  const userList = useAppSelector(state => state.user.userList);
  const luke = userList.find(({ username }) => username === 'Luck')!;

  const createNewResume = ({ notRecommendReason, ...rest }: ResumeVO) => {
    const resume: ResumeDTO = {
      id: uuid(),
      ...rest,
    };
    const action = {
      id: uuid(),
      resumeId: resume.id,
      interviewProcessId: interviewProcessList[0].id,
      date: new Date().toISOString(),
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
          ...action,
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
          ...action,
          comment: '',
          // TODO: 由谁筛选简历
          ownerIds: [luke.id],
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
