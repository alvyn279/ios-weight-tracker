import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from './store';
import { initAuthorization } from './store/appStatus';
import HistoryStackScreen from './components/History';
import HomeStackScreen from './components/Home';
import {
  getTabBarScreenProps,
  getTabNavigatorProps,
} from './components/TabBar';
import WarningPanel from './components/WarningPanel';
import { i18n } from './utils/i18n';
import { RootStackParamList, SCREENS } from './utils/navigation';
import { useTheme } from './hooks';

const Tab = createBottomTabNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  absoluteZero: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AppContainer = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const appHasPermissions = useAppSelector<boolean>(
    state => state.appStatus.canShareWithHealth,
  );
  // TODO: look at transient error
  // const permissionsError = useAppSelector<SerializedError | null>(
  //   state => state.appStatus.initError,
  // );
  const permissionsLoading = useAppSelector<boolean>(
    state => state.appStatus.loading,
  );

  useEffect(() => {
    dispatch(initAuthorization());
    return () => {};
  }, [dispatch]);

  const withStatusIndicator = (children: React.ReactNode) => (
    <>
      <StatusBar barStyle={theme.barStyle} />
      {children}
    </>
  );

  if (permissionsLoading) {
    return withStatusIndicator(
      <SafeAreaView style={[styles.absoluteZero, theme.backgroundStyle]}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>,
    );
  }

  return appHasPermissions
    ? withStatusIndicator(
        <NavigationContainer
          theme={theme.isDarkMode ? theme.DarkTheme : theme.DefaultTheme}>
          <Tab.Navigator {...getTabNavigatorProps(theme)}>
            <Tab.Screen
              name={SCREENS.TAB_HOME}
              component={HomeStackScreen}
              {...getTabBarScreenProps(SCREENS.TAB_HOME)}
            />
            <Tab.Screen
              name={SCREENS.TAB_HISTORY}
              component={HistoryStackScreen}
              {...getTabBarScreenProps(SCREENS.TAB_HISTORY)}
            />
          </Tab.Navigator>
        </NavigationContainer>,
      )
    : withStatusIndicator(
        <WarningPanel
          message={i18n.warningPanel_missingHealthPermissions}
          ioniconProps={{
            name: 'lock-closed-outline',
          }}
        />,
      );
};

export default AppContainer;
