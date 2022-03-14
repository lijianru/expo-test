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
  interviewTimeline: InterviewTimelineDTO[];
};

type InterviewTimelineDTO = {
  id: string;
  name: string;
  status: RESUME_STATUS;
  comment: string;
  date: string;
  owner: string;
};
