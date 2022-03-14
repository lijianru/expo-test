export type UserVO = {
  username: string;
  password: string;
  roleId: string;
};

export type UserDTO = {
  id: string;
} & UserVO;
