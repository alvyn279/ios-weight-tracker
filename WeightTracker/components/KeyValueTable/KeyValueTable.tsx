import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../ThemedText';
import { useTheme } from '../../hooks';

const styles = StyleSheet.create({
  optionsTable: {
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  optionsRow: {
    height: 55,
    maxHeight: 55,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  optionsSeparator: {
    marginBottom: StyleSheet.hairlineWidth,
  },
  optionKeyName: {
    fontSize: 18,
  },
});

export interface KeyValueItem {
  key: string;
  value: React.ReactNode | string;
}

interface KeyValueTableProps {
  items: Array<KeyValueItem>;
  separatorLineColor?: string;
}

const KeyValueTable: React.FC<KeyValueTableProps> = props => {
  const { modalBackgroundStyle } = useTheme();
  return (
    <View
      style={[
        styles.optionsTable,
        { backgroundColor: props.separatorLineColor },
      ]}>
      {props.items.map((keyValueItem, index) => (
        <View
          key={index}
          style={[
            styles.optionsRow,
            modalBackgroundStyle,
            index !== props.items.length - 1 ? styles.optionsSeparator : {},
          ]}>
          <Text style={[styles.optionKeyName]}>{keyValueItem.key}</Text>
          {typeof keyValueItem.value === 'string' ? (
            <Text>{keyValueItem.value}</Text>
          ) : (
            keyValueItem.value
          )}
        </View>
      ))}
    </View>
  );
};

export default KeyValueTable;
