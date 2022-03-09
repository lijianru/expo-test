import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../utils/uuid';
import {
  InterviewProcessDTO,
  InterviewProcessVO,
} from './../client/InterviewProcessManagement/types';

export interface InterviewProcessState {
  interviewProcessList: InterviewProcessDTO[];
}

const initialState: InterviewProcessState = {
  interviewProcessList: [],
};

export const interviewProcessSlice = createSlice({
  name: 'interviewProcess',
  initialState,
  reducers: {
    createInterviewProcess: (state, action: PayloadAction<InterviewProcessVO>) => {
      const newInterviewProcess: InterviewProcessDTO = {
        ...action.payload,
        id: uuid(),
      };

      state.interviewProcessList.push(newInterviewProcess);
    },
    deleteInterviewProcess: (state, action: PayloadAction<string>) => {
      state.interviewProcessList = [
        ...state.interviewProcessList.filter(({ id }) => id !== action.payload),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { createInterviewProcess, deleteInterviewProcess } = interviewProcessSlice.actions;

export const interviewProcessReducer = interviewProcessSlice.reducer;
