import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HistoryProps, SCREENS } from '../../utils/navigation';
import { useTheme } from '../../hooks';
import { getCommonNavigatorProps } from '../TabBar';

const HistoryStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  historyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Temp = ({ navigation }: HistoryProps) => (
  <View style={[styles.historyView]}>
    <Button
      title="Go to home"
      onPress={() => navigation.navigate(SCREENS.HOME, { fromHistory: true })}
    />
  </View>
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
