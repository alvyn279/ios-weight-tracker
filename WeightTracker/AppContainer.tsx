import React from 'react';
import AppleHealthKit, {
  HealthKitPermissions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HealthStatusCode,
  HealthStatusResult,
} from 'react-native-health';
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

  // Check not on ipad
  AppleHealthKit.isAvailable((err: Object, result: boolean) => {
    if (err) {
      console.warn('Cannot fetch Health availability status');
    }

    console.log('Health Kit is available:', result);

    // Ask for permissions
    AppleHealthKit.initHealthKit(permissions, (initError: string) => {
      /* Called after we receive a response from the system */
      if (initError) {
        // some error when writing permissions for app.
        console.warn('Cannot grant permissions!');
      }

      // Check AuthZ status
      AppleHealthKit.getAuthStatus(
        permissions,
        (authErr: string, results: HealthStatusResult) => {
          if (authErr) {
            // some error when reading auth status.
            console.warn('Cannot fetch auth status!');
          }
          /**
           * See {@link HealthStatusCode}
           */
          console.log(results);
        },
      );
    });
  });

  return <App healthKit={AppleHealthKit} />;
};

export default AppContainer;
