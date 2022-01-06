import React from 'react';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import App from './App';

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Weight],
    write: [AppleHealthKit.Constants.Permissions.Weight],
  },
} as HealthKitPermissions;

const AppContainer = () => {
  // Garbage, only for prototype purposes, will refactor into redux
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
      return <App healthKit={null} />;
    }

    return <App healthKit={AppleHealthKit} />;
  });

  return <App healthKit={AppleHealthKit} />;
};

export default AppContainer;
