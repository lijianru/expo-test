import { createSlice } from '@reduxjs/toolkit';

import { UserDTO } from './../client/User/types';

export type AuthState = {
  auth: Omit<UserDTO, 'password'>;
};

const initialState: AuthState = {
  auth: {
    id: '123',
    username: 'Richard',
    roleId: '123',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
