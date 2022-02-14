import { RootState } from '..';

export const selectCanShareWithHealth = (state: RootState): boolean =>
  !!state.appStatus.canShareWithHealth;

export const selectResolvedHealthPermissions = (state: RootState): boolean =>
  state.appStatus.canShareWithHealth !== null;

export const selectArePermissionsLoading = (state: RootState): boolean =>
  state.appStatus.loading;
