import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserDTO } from './../client/User/types';

export type AuthState = {
  auth: Omit<UserDTO, 'password'>;
};

const userList: Array<Omit<UserDTO, 'password'>> = [
  {
    id: '21a35de-1648128101839',
    roleId: '18f58ea-1648128024406',
    username: 'Lucy',
  },
  {
    id: 'd7ea8-1648128113970',
    roleId: '11f6c2a-1648128032507',
    username: 'Musky',
  },
  {
    id: '4e6deab-1648128125071',
    roleId: '34d604f-1648128053858',
    username: 'Luke',
  },
  {
    id: '3855f46-1648128139789',
    roleId: '239a0c8-1648128074075',
    username: 'Richard',
  },
];

const initialState: AuthState = {
  auth: {} as Omit<UserDTO, 'password'>,
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
