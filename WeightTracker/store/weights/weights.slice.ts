import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { HealthValue } from 'react-native-health';
import { HealthUnit } from '../../utils/constants';
import { RootState } from '..';
import { HKGetLatestWeight } from '../../api/health-kit';

type LatestWeightFetch = {
  value: HealthValue | null;
  error: SerializedError | null;
  loading: boolean;
};

interface WeightsState {
  unit: HealthUnit;
  latestWeight: LatestWeightFetch;
}

const initialState: WeightsState = {
  unit: HealthUnit.pound,
  latestWeight: {
    value: null,
    error: null,
    loading: false,
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
    unit: currentState.weights.unit,
  });
  return latestWeight;
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
      );
  },
});

export default weightsSlice.reducer;
