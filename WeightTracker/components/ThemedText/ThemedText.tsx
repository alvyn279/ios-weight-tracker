import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks';

interface ThemedTextProps extends TextProps {
  style?: Array<object>;
}

const ThemedText: React.FC<ThemedTextProps> = props => {
  const { textStyle } = useTheme();

  return (
    <Text style={[textStyle, ...(props.style || [])]}>{props.children}</Text>
  );
};

export default ThemedText;
