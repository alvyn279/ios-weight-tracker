import AppleHealthKit, {
  HealthKitPermissions,
  HealthStatusCode,
  HealthStatusResult,
  HealthUnitOptions,
  HealthValue,
  HealthValueOptions,
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

/**
 * Returns Promise to get the latest weight saved in Health.
 * @param options {@link HealthValueOptions}
 */
export const HKGetLatestWeight = (options: HealthUnitOptions) =>
  new Promise<HealthValue>((resolve, reject) => {
    AppleHealthKit.getLatestWeight(
      options,
      (err: string, latestWeight: HealthValue) => {
        if (err) {
          reject(new Error(`Cannot fetch latest weight: ${err}`));
        }
        resolve(latestWeight);
      },
    );
  });

/**
 * Returns Promise to save weight to Health.
 * @param options {@link HealthValueOptions}
 */
export const HKSaveWeight = (options: HealthValueOptions) =>
  new Promise<HealthValue>((resolve, reject) => {
    AppleHealthKit.saveWeight(
      options,
      (err: string, savedWeight: HealthValue) => {
        if (err) {
          reject(new Error(`Cannot save weight: ${err}`));
        }
        resolve(savedWeight);
      },
    );
  });
