import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthStatusCode } from 'react-native-health';

interface AppStatusState {
  canShareWithHealth: boolean;
  initError: string | null;
  loading: boolean;
}

const initialState: AppStatusState = {
  canShareWithHealth: false,
  initError: null,
  loading: false,
};

// TODO: refactor app initialization with createAsyncThunk()
export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    INITIALIZE_APP: (draftState: AppStatusState) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      draftState.initError = null;
      draftState.loading = true;
    },
    INITIALIZE_APP_ERROR: (
      draftState: AppStatusState,
      action: PayloadAction<string>,
    ) => {
      draftState.initError = action.payload;
      draftState.loading = false;
    },
    INITIALIZE_APP_DONE: (
      draftState: AppStatusState,
      action: PayloadAction<Array<HealthStatusCode>>,
    ) => {
      const writeWeightPermission = action.payload[0];
      draftState.canShareWithHealth =
        writeWeightPermission === HealthStatusCode.SharingAuthorized;
      draftState.initError = null;
      draftState.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { INITIALIZE_APP, INITIALIZE_APP_ERROR, INITIALIZE_APP_DONE } =
  appStatusSlice.actions;

export default appStatusSlice.reducer;
