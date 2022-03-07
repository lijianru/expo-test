export type InterviewProcessVO = {
  name: string;
  // userId list
  owner: string;
};

export type InterviewProcessDTO = InterviewProcessVO & {
  id: string;
};
