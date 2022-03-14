import { createSlice } from '@reduxjs/toolkit';

import { UserDTO } from './../client/User/types';

export type AuthState = {
  auth: Omit<UserDTO, 'password'>;
};

const initialState: AuthState = {
  auth: {
    id: '1647229147695',
    roleId: '1647229121878',
    username: 'Richard',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
