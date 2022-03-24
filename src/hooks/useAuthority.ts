import { Authority } from '../client/Role/types';
import { useAppSelector } from './useAppSelector';

export function useAuthority(authorities: Authority[]) {
  const auth = useAppSelector(state => state.auth.auth);
  const roleList = useAppSelector(state => state.role.roleList);

  const currentRole = roleList.find(({ id }) => id === auth.roleId);

  if (!currentRole) return false;

  return (
    [...new Set([...authorities, ...currentRole.authorities])].length <
    authorities.length + currentRole.authorities.length
  );
}
