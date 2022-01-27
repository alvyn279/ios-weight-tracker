import { ColorValue, StatusBarStyle, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export type TextStyle = {
  color: number | ColorValue;
};

export type ThemedStyles = {
  isDarkMode: boolean;
  DarkTheme: Theme;
  DefaultTheme: Theme;
  backgroundStyle: object;
  textStyle: TextStyle;
  barStyle: StatusBarStyle;
  navBarStyle: object;
  touchFeedbackColor: string;
};

export const useTheme = (): ThemedStyles => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    isDarkMode,
    DarkTheme,
    DefaultTheme,
    backgroundStyle: {
      backgroundColor: isDarkMode
        ? DarkTheme.colors.background
        : DefaultTheme.colors.background,
    },
    textStyle: {
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    barStyle: isDarkMode ? 'light-content' : 'dark-content',
    navBarStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.light,
    },
    touchFeedbackColor: isDarkMode ? Colors.dark : 'gainsboro',
  };
};
