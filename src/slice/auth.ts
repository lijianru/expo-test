import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserDTO } from './../client/User/types';

export type AuthState = {
  auth: Omit<UserDTO, 'password'>;
};

const userList: Array<Omit<UserDTO, 'password'>> = [
  {
    id: '4469658-1647859534780',
    roleId: '34c95d7-1647859390691',
    username: 'Lucy',
  },
  {
    id: '1c97ac4-1647859549435',
    roleId: '5260f3b-1647859421408',
    username: 'Luck',
  },
  {
    id: '5ee3f62-1647859560386',
    roleId: '2a58059-1647859436192',
    username: 'Richard',
  },
  {
    id: '266ed94-1647859575986',
    roleId: '5a97c3e-1647859513644',
    username: 'Musky',
  },
];

const initialState: AuthState = {
  auth: {
    id: '1c97ac4-1647859549435',
    roleId: '5260f3b-1647859421408',
    username: 'Luck',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const currentUser = userList.find(({ username }) => action.payload.username === username);
      state.auth = currentUser ? { ...currentUser } : ({} as AuthState['auth']);
    },
    logout: state => {
      state.auth = {} as AuthState['auth'];
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
