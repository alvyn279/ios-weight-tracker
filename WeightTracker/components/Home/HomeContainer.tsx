import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../../utils/navigation';
import HomeScreen from './HomeScreen';
import { getCommonNavigatorProps } from '../TabBar';
import { useTheme } from '../../hooks';

const HomeStack = createNativeStackNavigator();

const HomeContainer = () => {
  const theme = useTheme();
  // hook into redux store for last weight
  // use dispatch
  return (
    <HomeStack.Navigator {...getCommonNavigatorProps(theme)}>
      <HomeStack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeContainer;
