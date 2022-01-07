import AppleHealthKit, {
  HealthKitPermissions,
  HealthStatusCode,
  HealthStatusResult,
} from 'react-native-health';

export const HKIsSharingAuthorizedForPermission = (status: HealthStatusCode) =>
  status === 2;

export const HKIsAvailable = () =>
  new Promise<boolean>((resolve, reject) => {
    AppleHealthKit.isAvailable((err: Object, result: boolean) => {
      if (err) {
        reject(
          new Error('Cannot fetch Health availability status on your device.'),
        );
      }

      resolve(result);
    });
  });

export const HKInitialize = (permissions: HealthKitPermissions) =>
  new Promise<void>((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, (initError: string) => {
      if (initError) {
        reject(new Error('Cannot grant permissions for app on Health.'));
      }

      resolve();
    });
  });

/**
 * Returns the authorization status for a given Health Kit {@link HealthKitPermissions}
 * object.
 *
 * See {@link HealthStatusCode} for results.
 *
 * @param permissions Input permissions object to be analyzed
 */
export const HKGetAuthZStatus = (permissions: HealthKitPermissions) =>
  new Promise<HealthStatusResult>((resolve, reject) => {
    AppleHealthKit.getAuthStatus(
      permissions,
      (authErr: string, results: HealthStatusResult) => {
        if (authErr) {
          reject(
            new Error('Cannot fetch authorization status for app on Health.'),
          );
        }

        resolve(results);
      },
    );
  });
