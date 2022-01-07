import React, { useEffect, useState } from 'react';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import {
  HKInitialize,
  HKIsAvailable,
  HKIsSharingAuthorizedForPermission,
  HKGetAuthZStatus,
} from './api/health-kit';
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
  const [deviceIsSupported, setDeviceIsSupported] = useState<boolean>(true);
  const [appHasPermissions, setAppHasPermissions] = useState<boolean>(false);

  const initAppleHealthKit = async () => {
    try {
      // Check if Health is available on device
      const isAvailable = await HKIsAvailable();
      setDeviceIsSupported(isAvailable);
      // Ask for permissions
      await HKInitialize(permissions);
      // Check permissions
      const authZStatus = await HKGetAuthZStatus(permissions);
      setAppHasPermissions(
        HKIsSharingAuthorizedForPermission(authZStatus.permissions.write[0]),
      );
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    initAppleHealthKit();
    return () => {};
  }, []);

  return (
    <App
      healthKit={AppleHealthKit}
      deviceIsSupported={deviceIsSupported}
      appHasPermissions={appHasPermissions}
    />
  );
};

export default AppContainer;
