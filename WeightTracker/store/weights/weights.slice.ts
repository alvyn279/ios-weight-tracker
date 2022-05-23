import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { HealthValue } from 'react-native-health';
import { RootState } from '..';
import { HKGetLatestWeight, HKSaveWeight } from '../../api/health-kit';

type LatestWeightFetch = {
  value: HealthValue | null;
  error: SerializedError | null;
  loading: boolean;
};

type SaveWeight = {
  error: SerializedError | null;
  saving: boolean;
};

interface WeightsState {
  latestWeight: LatestWeightFetch;
  saveWeight: SaveWeight;
}

const initialState: WeightsState = {
  latestWeight: {
    value: null,
    error: null,
    loading: false,
  },
  saveWeight: {
    saving: false,
    error: null,
  },
};

/**
 * Thunk to fetch the latest weight that was saved to Apple Heatlh.
 */
export const fetchLatestWeight = createAsyncThunk<
  HealthValue,
  void,
  { state: RootState }
>('weights/fetchLatestWeight', async (_args, thunkAPI) => {
  const currentState = thunkAPI.getState();
  const latestWeight = await HKGetLatestWeight({
    unit: currentState.preferences.unit,
  });
  return latestWeight;
});

export type SaveWeightDTO = {
  value: number;
  date: Date;
};

/**
 * Thunk to save a weight to Apple Heatlh.
 */
export const saveWeight = createAsyncThunk<
  HealthValue,
  SaveWeightDTO,
  { state: RootState }
>('weights/saveWeight', async (args, thunkAPI) => {
  const currentState = thunkAPI.getState();
  return await HKSaveWeight({
    unit: currentState.preferences.unit,
    value: args.value,
    // For weight, set startDate & endDate the same, see
    // https://developer.apple.com/documentation/healthkit/hksample/1615481-startdate
    startDate: args.date.toISOString(),
    endDate: args.date.toISOString(),
  });
});

const weightsSlice = createSlice({
  name: 'weights',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<WeightsState>) => {
    builder
      .addCase(
        fetchLatestWeight.fulfilled,
        (draftState: WeightsState, action: PayloadAction<HealthValue>) => {
          draftState.latestWeight.value = action.payload;
          draftState.latestWeight.error = null;
          draftState.latestWeight.loading = false;
        },
      )
      .addCase(fetchLatestWeight.pending, (draftState: WeightsState) => {
        draftState.latestWeight.error = null;
        draftState.latestWeight.loading = true;
      })
      .addCase(
        fetchLatestWeight.rejected,
        (draftState: WeightsState, action) => {
          draftState.latestWeight.error = action.error;
          draftState.latestWeight.loading = false;
        },
      )
      .addCase(
        saveWeight.fulfilled,
        (draftState: WeightsState, _action: PayloadAction<HealthValue>) => {
          draftState.saveWeight.error = null;
          draftState.saveWeight.saving = false;
        },
      )
      .addCase(saveWeight.pending, (draftState: WeightsState) => {
        draftState.saveWeight.error = null;
        draftState.saveWeight.saving = true;
      })
      .addCase(saveWeight.rejected, (draftState: WeightsState, action) => {
        draftState.saveWeight.error = action.error;
        draftState.saveWeight.saving = false;
      });
  },
});

export default weightsSlice.reducer;
