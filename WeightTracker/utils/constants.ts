import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

export const APP_HEALTH_PERMISSIONS = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Weight],
    write: [AppleHealthKit.Constants.Permissions.Weight],
  },
} as HealthKitPermissions;
