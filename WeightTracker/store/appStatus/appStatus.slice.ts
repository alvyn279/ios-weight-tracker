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
import { APP_HEALTH_PERMISSIONS } from '../../utils/constants';

interface AppStatusState {
  canShareWithHealth: boolean | null;
  initError: SerializedError | null;
  loading: boolean;
}

const initialState: AppStatusState = {
  canShareWithHealth: null,
  initError: null,
  loading: false,
};

/**
 * Thunk called once at app initialization to:
 * 1) Check if Health is available
 * 2) Ask for permissions (only done once, after app installation).
 *    Subsequent permissions prompts are never shown. User must
 *    configure in Settings.
 * 3) Check read/write permissions are given
 */
export const initAuthorization = createAsyncThunk(
  'appStatus/initAuthorization',
  async () => {
    // Check if Health is available on device
    const isAvailable = await HKIsAvailable();

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

/**
 * Thunk that "screens" the active app permissions to make sure the
 * user is still authorized to read/write to Health app.
 */
export const screenAuthorization = createAsyncThunk(
  'appStatus/screenAuthorization',
  async () => {
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
      )
      .addCase(
        screenAuthorization.fulfilled,
        (
          draftState: AppStatusState,
          action: PayloadAction<Array<HealthStatusCode>>,
        ) => {
          const writeWeightPermission = action.payload[0];
          draftState.canShareWithHealth = HKIsSharingAuthorizedForPermission(
            writeWeightPermission,
          );
          draftState.initError = null;
        },
      )
      .addCase(
        screenAuthorization.rejected,
        (draftState: AppStatusState, action) => {
          // TODO: maybe look into another error field for this
          draftState.initError = action.error;
        },
      );
  },
});

export default appStatusSlice.reducer;
