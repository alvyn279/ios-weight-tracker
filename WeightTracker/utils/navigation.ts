import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SCREENS {
  HOME = 'Home',
  HISTORY = 'History',
  TAB_HOME = 'Tab home',
  TAB_HISTORY = 'Tab history',
}

export type RootStackParamList = {
  [SCREENS.HOME]: {
    fromHistory: boolean;
  };
  [SCREENS.HISTORY]: undefined;
  [SCREENS.TAB_HOME]: undefined;
  [SCREENS.TAB_HISTORY]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.HOME
>;

export type HistoryProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.HISTORY
>;
