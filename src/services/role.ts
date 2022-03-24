import { createRole, deleteRole } from '../slice/roleSlice';
import { uuid } from '../utils/uuid';
import { Authority, RoleDTO, RoleFormVO } from './../client/Role/types';
import { useAppDispatch } from './../hooks/useAppDispatch';

export function useRole() {
  const dispatch = useAppDispatch();

  const handleCreateRole = (role: RoleFormVO) => {
    const newRole: RoleDTO = {
      ...role,
      id: uuid(),
      authorities: Object.entries(role.authorities)
        .filter(([, value]) => !!value)
        .map(([key]) => key as Authority),
    };

    dispatch(createRole(newRole));
  };

  const handleDeleteRole = (id: string) => {
    dispatch(deleteRole(id));
  };

  return {
    handleCreateRole,
    handleDeleteRole,
  };
}
