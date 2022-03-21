import { RESUME_STATUS, SEX_TYPES } from './enum';

export type ResumeFormVO = {
  username: string;
  sex: keyof typeof SEX_TYPES;
  job: string;
  phone: string;
  resumesUrl: string;
  notRecommendReason?: string;
  createdDate: string;
  createdBy: string;
  ownerIds: string[];
};

export type ResumeDTO = Omit<ResumeFormVO, 'notRecommendReason' | 'ownerIds'> & {
  id: string;
  closedDate?: string;
};

export type ResumeVO = ResumeDTO;

export type InterviewActionFormVO = {
  resumeId: string;
  interviewProcessId: string;
  status: RESUME_STATUS;
  comment: string;
  createdDate: string;
  closedDate?: string;
  // 记录谁Approved 或 unapproved
  updatedBy: string;
  // 由谁处理这一步骤
  ownerIds: string[];
};

export type InterviewActionDTO = InterviewActionFormVO & {
  id: string;
};

export type InterviewActionVO = InterviewActionDTO & {
  updatedByUsername?: string;
  ownerIdsUsername?: string[];
  interviewProcessName?: string;
};
