import {StatusBarStyle, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ThemedStyles {
  backgroundStyle: object;
  textStyle: object;
  barStyle: StatusBarStyle;
}

export const useTheme = (): ThemedStyles => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    backgroundStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    textStyle: {
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    barStyle: isDarkMode ? 'light-content' : 'dark-content',
  };
};
