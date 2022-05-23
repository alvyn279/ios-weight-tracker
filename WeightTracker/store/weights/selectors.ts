import { RootState } from '..';

export const selectLatestWeight = (state: RootState) =>
  state.weights.latestWeight.value?.value;

export const selectLatestWeightLoading = (state: RootState) =>
  state.weights.latestWeight.loading;

export const selectSaveWeight = (state: RootState) => state.weights.saveWeight;
