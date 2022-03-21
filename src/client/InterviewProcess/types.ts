// 表单
export type InterviewProcessFormVO = {
  name: string;
  description: string;
};

// 数据库
export type InterviewProcessDTO = InterviewProcessFormVO & {
  id: string;
};

// 展示
export type InterviewProcessVO = InterviewProcessDTO;
