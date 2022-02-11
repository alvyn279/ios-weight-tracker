import { ColorValue, StatusBarStyle, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
  },
};

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
  buttonTextPrimaryColor: TextStyle;
  modalBackgroundStyle: object;
};

export const useTheme = (): ThemedStyles => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    isDarkMode,
    DarkTheme: CustomDarkTheme,
    DefaultTheme,
    backgroundStyle: {
      backgroundColor: isDarkMode
        ? CustomDarkTheme.colors.background
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
    buttonTextPrimaryColor: {
      color: isDarkMode
        ? CustomDarkTheme.colors.primary
        : DefaultTheme.colors.primary,
    },
    modalBackgroundStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.light,
    },
  };
};
