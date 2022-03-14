import { ResumeDTO } from '../client/Resume/types';
import { useAppSelector } from '../hooks/useAppSelector';

export function useTodoResume(): ResumeDTO[] {
  const resumeList = useAppSelector(state => state.resume.resumeList);

  // 使用当前登陆用户的ID过滤出需要他处理的简历
  const currentUserId = useAppSelector(state => state.auth.auth.id);

  return resumeList.filter(({ assign }) => assign === currentUserId);
}

export function useUploadedByMeResume(): ResumeDTO[] {
  const resumeList = useAppSelector(state => state.resume.resumeList);

  // 使用当前登陆用户的ID过滤出需要他处理的简历
  const currentUserId = useAppSelector(state => state.auth.auth.id);

  return resumeList.filter(({ createdBy }) => createdBy === currentUserId);
}
