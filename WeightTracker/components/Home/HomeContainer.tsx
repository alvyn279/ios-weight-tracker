import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../../utils/navigation';
import HomeScreen from './HomeScreen';

const HomeStack = createNativeStackNavigator();

const HomeContainer = () => {
  // hook into redux store for last weight
  // use dispatch
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={SCREENS.HOME} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeContainer;
