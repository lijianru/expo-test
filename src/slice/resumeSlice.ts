import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResumeDTO, ResumeVO } from '../client/Resume/types';
import { uuid } from '../utils/uuid';

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
    createResume: (state, action: PayloadAction<ResumeVO>) => {
      const resume: ResumeDTO = {
        ...action.payload,
        id: uuid(),
        timeline: [],
      };
      state.resumeList.push(resume);
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumeList = [...state.resumeList.filter(({ id }) => id !== action.payload)];
    },
  },
});

export const { createResume, deleteResume } = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;
