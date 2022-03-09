import { AUTHORITY } from './enums';

export type Authority = keyof typeof AUTHORITY;

export type RoleVO = {
  name: string;
  authorities: Record<Authority, boolean>;
};

export type RoleDTO = {
  id: string;
} & RoleVO;
