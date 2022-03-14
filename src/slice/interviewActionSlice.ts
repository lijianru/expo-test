import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InterviewActionDTO } from './../client/Resume/types';

export type InterviewActionState = {
  interviewActionList: InterviewActionDTO[];
};

const initialState: InterviewActionState = {
  interviewActionList: [],
};

export const interviewActionSlice = createSlice({
  name: 'interviewAction',
  initialState,
  reducers: {
    createInterviewAction: (state, action: PayloadAction<InterviewActionDTO>) => {
      state.interviewActionList.push(action.payload);
    },
    updateInterviewAction: (state, action: PayloadAction<InterviewActionDTO>) => {
      state.interviewActionList = [
        ...state.interviewActionList.map(interviewAction => {
          if (interviewAction.id === action.payload.id) {
            return {
              ...action.payload,
            };
          } else {
            return {
              ...interviewAction,
            };
          }
        }),
      ];
    },
  },
});

export const { createInterviewAction, updateInterviewAction } = interviewActionSlice.actions;

export const interviewActionReducer = interviewActionSlice.reducer;
