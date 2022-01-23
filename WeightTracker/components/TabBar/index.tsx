import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { SCREENS, TAB_SCREEN } from '../../utils/navigation';
import { ThemedStyles } from '../../hooks/theme';

type TabBarIconCallback = {
  focused: boolean;
  color: string;
  size: number;
};

const getTabBarIcon =
  (iconName: string) =>
  ({ focused, ...rest }: TabBarIconCallback) =>
    <Icon name={focused ? iconName : `${iconName}-outline`} {...rest} />;

const TAB_BAR_PROPS = {
  [SCREENS.TAB_HOME]: {
    options: {
      tabBarLabel: SCREENS.HOME,
      tabBarIcon: getTabBarIcon('home'),
    },
  },
  [SCREENS.TAB_HISTORY]: {
    options: {
      tabBarLabel: SCREENS.HISTORY,
      tabBarIcon: getTabBarIcon('stats-chart'),
    },
  },
};

export const getTabBarScreenProps = (tabBarScreenName: TAB_SCREEN) =>
  TAB_BAR_PROPS[tabBarScreenName];

export const getCommonNavigatorProps = (theme: ThemedStyles): object => {
  const { navBarStyle, textStyle } = theme;
  return {
    screenOptions: {
      headerTitleStyle: {
        ...textStyle,
      },
      headerStyle: {
        ...navBarStyle,
      },
      headerLargeTitle: true,
      headerLargeStyle: {
        ...theme.backgroundStyle,
      },
      headerLargeTitleShadowVisible: false,
    },
  };
};

export const getTabNavigatorProps = (theme: ThemedStyles): object => {
  const { navBarStyle } = theme;
  return {
    screenOptions: {
      headerShown: false,
      tabBarStyle: {
        ...navBarStyle,
        position: 'absolute',
        opacity: 0.8,
        borderTopWidth: 0,
      },
    },
  };
};
