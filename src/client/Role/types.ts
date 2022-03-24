export type Authority = 'ROLE_MANAGEMENT' | 'USER_MANAGEMENT' | 'PROCESS_MANAGEMENT';

export type RoleFormVO = {
  name: string;
  authorities: Record<Authority, boolean>;
};

export type RoleDTO = {
  id: string;
  authorities: Authority[];
} & Omit<RoleFormVO, 'authorities'>;

export type RoleVO = RoleDTO;
