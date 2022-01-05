import React from 'react';
import {Text, TextProps, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ThemedTextProps extends TextProps {
  style?: Array<object>;
}

const ThemedText: React.FC<ThemedTextProps> = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const darkModeAwareTextStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  return (
    <Text style={[darkModeAwareTextStyle, ...(props.style || [])]}>
      {props.children}
    </Text>
  );
};

export default ThemedText;
