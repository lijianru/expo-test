import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResumeDTO } from '../client/Resume/types';

export type ResumeState = {
  resumeList: ResumeDTO[];
};

const initialState: ResumeState = {
  resumeList: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    createResume: (state, action: PayloadAction<ResumeDTO>) => {
      state.resumeList.push(action.payload);
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumeList = [...state.resumeList.filter(({ id }) => id !== action.payload)];
    },
    updateResume: (state, action: PayloadAction<ResumeDTO>) => {
      state.resumeList = [
        ...state.resumeList.map(resume => {
          if (resume.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } else {
            return resume;
          }
        }),
      ];
    },
  },
});

export const { createResume, deleteResume, updateResume } = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;
