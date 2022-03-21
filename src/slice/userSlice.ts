import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserDTO } from '../client/User/types';
import { uuid } from '../utils/uuid';
import { UserFormVO } from './../client/User/types';

export type UserState = {
  userList: UserDTO[];
};

const initState: UserState = {
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    createUser: (state, action: PayloadAction<UserFormVO>) => {
      state.userList.push({
        ...action.payload,
        id: uuid(),
      });
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.userList = [...state.userList.filter(({ id }) => id !== action.payload)];
    },
  },
});

export const { createUser, deleteUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
