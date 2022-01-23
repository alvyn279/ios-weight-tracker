import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks';

import Text from '../ThemedText';

const styles = StyleSheet.create({
  panelView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingVertical: 20,
  },
  warningTextContainer: {
    flexDirection: 'row',
  },
  warningText: {
    flexDirection: 'row',
    textAlign: 'center',
    flex: 0.8,
    fontSize: 16,
  },
});

const DEFAULT_PANEL_ICON_SIZE = 75;

export interface WarningPanelProps {
  readonly ioniconProps: IconProps;
  readonly message: string;
}

export const WarningPanel: React.FC<WarningPanelProps> = props => {
  const { textStyle, backgroundStyle } = useTheme();

  return (
    <View style={[styles.panelView, backgroundStyle]}>
      <Ionicons
        style={styles.iconContainer}
        size={DEFAULT_PANEL_ICON_SIZE}
        color={textStyle.color}
        {...props.ioniconProps}
      />
      <View style={[styles.warningTextContainer]}>
        <Text style={[styles.warningText]}>{props.message}</Text>
      </View>
    </View>
  );
};

export default WarningPanel;
