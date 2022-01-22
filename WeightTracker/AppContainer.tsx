import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAppDispatch, useAppSelector } from './store';
import { initAuthorization } from './store/appStatus';
import WarningPanel from './components/WarningPanel';
import HomeStackScreen from './components/Home';
import HistoryStackScreen from './components/History';
import { RootStackParamList, SCREENS } from './utils/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppContainer = () => {
  const dispatch = useAppDispatch();
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

  if (permissionsLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  return appHasPermissions ? (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={SCREENS.TAB_HOME}
          options={{ tabBarLabel: SCREENS.HOME }}
          component={HomeStackScreen}
        />
        <Tab.Screen
          name={SCREENS.TAB_HISTORY}
          options={{ tabBarLabel: SCREENS.HISTORY }}
          component={HistoryStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <WarningPanel
      message={'Something is wrong'}
      iconName={'lock-closed-outline'}
    />
  );
};

export default AppContainer;
