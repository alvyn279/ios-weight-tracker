import { RootState } from '..';

export const selectCanShareWithHealth = (state: RootState) =>
  state.appStatus.canShareWithHealth;

export const selectArePermissionsLoading = (state: RootState) =>
  state.appStatus.loading;
