import { AUTHORITY } from './enums';

export type Authority = keyof typeof AUTHORITY;

export type RoleFormVO = {
  name: string;
  authorities: Record<Authority, boolean>;
};

export type RoleDTO = {
  id: string;
} & RoleFormVO;

export type RoleVO = RoleDTO;
