import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthUnit } from '../../utils/constants';

interface PreferencesState {
  unit: HealthUnit;
}

const initialState: PreferencesState = {
  unit: HealthUnit.pound,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<HealthUnit>) => {
      state.unit = action.payload;
    },
  },
});

export default preferencesSlice.reducer;

export const { setUnit } = preferencesSlice.actions;
