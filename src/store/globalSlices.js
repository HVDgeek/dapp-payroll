import { createSlice } from "@reduxjs/toolkit";
import { globalState as GlobalState } from "./states/globalStaters";
import { globalActions as GlobalActions } from "./actions/globalActions";

const globalSlice = createSlice({
  name: "global",
  initialState: GlobalState,
  reducers: GlobalActions,
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
