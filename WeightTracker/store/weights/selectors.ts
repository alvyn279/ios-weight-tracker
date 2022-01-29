import { RootState } from '..';

export const selectPreferredWeightUnit = (state: RootState) =>
  state.weights.unit;

export const selectLatestWeight = (state: RootState) =>
  state.weights.latestWeight.value?.value;

export const selectLatestWeightLoading = (state: RootState) =>
  state.weights.latestWeight.loading;
