import { SerializedError } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import App from './App';
import { useAppDispatch, useAppSelector } from './store';
import { initAuthorization } from './store/appStatus';

const AppContainer = () => {
  const dispatch = useAppDispatch();
  const appHasPermissions = useAppSelector<boolean>(
    state => state.appStatus.canShareWithHealth,
  );
  const permissionsError = useAppSelector<SerializedError | null>(
    state => state.appStatus.initError,
  );
  const permissionsLoading = useAppSelector<boolean>(
    state => state.appStatus.loading,
  );

  useEffect(() => {
    dispatch(initAuthorization());
    return () => {};
  }, [dispatch]);

  return (
    <App
      appHasPermissions={appHasPermissions}
      permissionsError={permissionsError?.message}
      permissionsLoading={permissionsLoading}
    />
  );
};

export default AppContainer;
