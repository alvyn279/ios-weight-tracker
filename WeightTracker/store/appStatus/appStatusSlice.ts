import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { HealthStatusCode } from 'react-native-health';
import {
  HKInitialize,
  HKIsAvailable,
  HKIsSharingAuthorizedForPermission,
  HKGetAuthZStatus,
} from '../../api/health-kit';
import { APP_HEALTH_PERMISSIONS } from '../../constants';

interface AppStatusState {
  canShareWithHealth: boolean;
  initError: SerializedError | null;
  loading: boolean;
}

const initialState: AppStatusState = {
  canShareWithHealth: false,
  initError: null,
  loading: false,
};

export const initAuthorization = createAsyncThunk(
  'appStatus/initAuthorization',
  async () => {
    // Check if Health is available on device
    const isAvailable = await HKIsAvailable();

    // TODO, remove test for screen loader
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (!isAvailable) {
      throw new Error('App is not supported on this device.');
    }

    // Ask for permissions
    await HKInitialize(APP_HEALTH_PERMISSIONS);

    // Check permissions
    const authZStatus = await HKGetAuthZStatus(APP_HEALTH_PERMISSIONS);
    return authZStatus.permissions.write;
  },
);

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AppStatusState>) => {
    builder
      .addCase(
        initAuthorization.fulfilled,
        (
          draftState: AppStatusState,
          action: PayloadAction<Array<HealthStatusCode>>,
        ) => {
          const writeWeightPermission = action.payload[0];
          draftState.canShareWithHealth = HKIsSharingAuthorizedForPermission(
            writeWeightPermission,
          );
          draftState.initError = null;
          draftState.loading = false;
        },
      )
      .addCase(initAuthorization.pending, (draftState: AppStatusState) => {
        draftState.initError = null;
        draftState.loading = true;
      })
      .addCase(
        initAuthorization.rejected,
        (draftState: AppStatusState, action) => {
          draftState.initError = action.error;
          draftState.loading = false;
        },
      );
  },
});

export default appStatusSlice.reducer;
