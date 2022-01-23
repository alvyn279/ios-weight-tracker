import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryProps, SCREENS } from '../../utils/navigation';
import { Button } from 'react-native';
import { useTheme } from '../../hooks';
import { getCommonNavigatorProps } from '../TabBar';

const HistoryStack = createNativeStackNavigator();

const Temp = ({ navigation }: HistoryProps) => (
  <Button
    title="Go to home"
    onPress={() => navigation.navigate(SCREENS.HOME, { fromHistory: true })}
  />
);

const HistoryContainer = () => {
  const theme = useTheme();
  // hook into redux store for all weights
  // use dispatch
  return (
    <HistoryStack.Navigator {...getCommonNavigatorProps(theme)}>
      <HistoryStack.Screen name={SCREENS.HISTORY} component={Temp} />
    </HistoryStack.Navigator>
  );
};

export default HistoryContainer;
