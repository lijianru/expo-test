import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../utils/uuid';
import { RoleDTO, RoleFormVO } from './../client/Role/types';

export interface RoleState {
  roleList: RoleDTO[];
}

const initialState: RoleState = {
  roleList: [],
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    createRole: (state, action: PayloadAction<RoleFormVO>) => {
      const newRole: RoleDTO = {
        ...action.payload,
        id: uuid(),
      };

      state.roleList.push(newRole);
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roleList = [...state.roleList.filter(({ id }) => id !== action.payload)];
    },
  },
});

// Action creators are generated for each case reducer function
export const { createRole, deleteRole } = roleSlice.actions;

export const roleReducer = roleSlice.reducer;
