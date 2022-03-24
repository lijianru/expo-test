import { Authority } from './types';

export const AUTHORITY: Record<Authority, Authority> = {
  ROLE_MANAGEMENT: 'ROLE_MANAGEMENT',
  USER_MANAGEMENT: 'USER_MANAGEMENT',
  PROCESS_MANAGEMENT: 'PROCESS_MANAGEMENT',
};

export const AUTHORITY_LIST = Object.keys(AUTHORITY) as Authority[];
