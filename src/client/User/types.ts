export type UserVO = {
  username: string;
  password: string;
  role: string;
};

export type UserDTO = {
  id: string;
} & UserVO;
