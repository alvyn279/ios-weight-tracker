import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryProps, SCREENS } from '../../utils/navigation';
import { Button } from 'react-native';

const HistoryStack = createNativeStackNavigator();

const Temp = ({ navigation }: HistoryProps) => (
  <Button
    title="Go to home"
    onPress={() => navigation.navigate(SCREENS.HOME, { fromHistory: true })}
  />
);

const HistoryContainer = () => {
  // hook into redux store for all weights
  // use dispatch
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name={SCREENS.HISTORY} component={Temp} />
    </HistoryStack.Navigator>
  );
};

export default HistoryContainer;
