import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Text from '../ThemedText';

const styles = StyleSheet.create({
  panelView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface WarningPanelProps {
  readonly iconName: string;
  readonly message: string;
}

export const WarningPanel: React.FC<WarningPanelProps> = props => {
  return (
    <View style={[styles.panelView]}>
      <Ionicons name={props.iconName} />
      <Text>{props.message}</Text>
    </View>
  );
};

export default WarningPanel;
