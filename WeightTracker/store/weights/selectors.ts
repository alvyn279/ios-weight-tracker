import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectLatestWeightFetch = (state: RootState) =>
  state.weights.latestWeight;

export const selectPreferredWeightUnit = (state: RootState) =>
  state.weights.unit;

export const selectLatestWeightValue = createSelector(
  selectLatestWeightFetch,
  latestWeightFetch => latestWeightFetch.value,
);
