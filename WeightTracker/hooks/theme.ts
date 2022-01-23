import { StatusBarStyle, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type ThemedStyles = {
  backgroundStyle: object;
  textStyle: object;
  barStyle: StatusBarStyle;
  navBarStyle: object;
};

export const useTheme = (): ThemedStyles => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    backgroundStyle: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
    textStyle: {
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    barStyle: isDarkMode ? 'light-content' : 'dark-content',
    navBarStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.light,
    },
  };
};
