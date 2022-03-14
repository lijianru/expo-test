import { RESUME_STATUS, SEX_TYPES } from './enum';

export type ResumeVO = {
  username: string;
  sex: keyof typeof SEX_TYPES;
  job: string;
  phone: string;
  resumesUrl: string;
  notRecommendReason?: string;
  createdDate: string;
  createdBy: string;
};

export type ResumeDTO = Omit<ResumeVO, 'notRecommendReason'> & {
  id: string;
  closedDate?: string;
};

export type InterviewActionVO = {
  resumeId: string;
  interviewProcessId: string;
  status: RESUME_STATUS;
  comment: string;
  date: string;
  // 记录谁Approved 或 unapproved
  updatedBy: string;
  // 由谁处理这一步骤
  ownerIds: string[];
};

export type InterviewActionDTO = InterviewActionVO & {
  id: string;
};
