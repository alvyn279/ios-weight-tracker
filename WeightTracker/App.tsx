import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  allPageContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActionText: {
    fontSize: 30,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.appView]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.allPageContainer, backgroundStyle]}>
        <Text
          style={[
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
            styles.mainActionText,
          ]}>
          Hellow 👋
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
