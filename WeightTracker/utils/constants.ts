import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

export const APP_HEALTH_PERMISSIONS = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Weight],
    write: [AppleHealthKit.Constants.Permissions.Weight],
  },
} as HealthKitPermissions;

export enum HealthUnit {
  bpm = 'bpm',
  calorie = 'calorie',
  celsius = 'celsius',
  count = 'count',
  day = 'day',
  fahrenheit = 'fahrenheit',
  foot = 'foot',
  gram = 'gram',
  hour = 'hour',
  inch = 'inch',
  joule = 'joule',
  kilocalorie = 'kilocalorie',
  meter = 'meter',
  mgPerdL = 'mgPerdL',
  mile = 'mile',
  minute = 'minute',
  mmhg = 'mmhg',
  mmolPerL = 'mmolPerL',
  percent = 'percent',
  pound = 'pound',
  second = 'second',
}
