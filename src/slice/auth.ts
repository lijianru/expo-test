import { createSlice } from '@reduxjs/toolkit';

import { UserDTO } from './../client/User/types';

export type AuthState = {
  auth: Omit<UserDTO, 'password'>;
};

// "userList": Array [
//   Object {
//     "id": "4469658-1647859534780",
//     "password": "111111",
//     "roleId": "34c95d7-1647859390691",
//     "username": "Lucy",
//   },
//   Object {
//     "id": "1c97ac4-1647859549435",
//     "password": "111111",
//     "roleId": "5260f3b-1647859421408",
//     "username": "Luck",
//   },
//   Object {
//     "id": "5ee3f62-1647859560386",
//     "password": "111111",
//     "roleId": "2a58059-1647859436192",
//     "username": "Richard",
//   },
//   Object {
//     "id": "266ed94-1647859575986",
//     "password": "111111",
//     "roleId": "5a97c3e-1647859513644",
//     "username": "Musky",
//   },
// ],

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
    login: state => {
      state.auth = { ...initialState.auth };
    },
    logout: state => {
      state.auth = {} as AuthState['auth'];
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
