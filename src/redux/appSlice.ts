import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  currentDate: number | null;
  isDoorOpen: boolean;
};

export const getAppInitialState = (): AppState => {
  return {
    currentDate: null,
    isDoorOpen: false,
  };
};

export const appSlice = createSlice({
  name: "app",
  initialState: getAppInitialState(),
  reducers: {
    setCurrentDate(state, { payload: newDate }: PayloadAction<number>) {
      state.currentDate = newDate;
    },
    setDoorState(state, { payload: newDoorState }: PayloadAction<boolean>) {
      state.isDoorOpen = newDoorState;
    },
  },
});
