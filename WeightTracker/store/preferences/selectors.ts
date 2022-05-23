import { RootState } from '..';

export const selectPreferredWeightUnit = (state: RootState) =>
  state.preferences.unit;
