import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useOnResume = (
  appStateRef: React.MutableRefObject<AppStateStatus>,
  callback: Function,
) => {
  // See https://reactnative.dev/docs/appstate
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callback();
      }

      appStateRef.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [appStateRef, callback]);
};
