export type UserFormVO = {
  username: string;
  password: string;
  roleId: string;
};

export type UserDTO = {
  id: string;
} & UserFormVO;

export type UserVO = UserDTO;
