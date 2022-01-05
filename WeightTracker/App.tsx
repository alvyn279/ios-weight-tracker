import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import Text from './components/ThemedText';
import { useTheme } from './hooks';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  allPageContainer: {
    padding: 20,
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainActionText: {
    fontSize: 30,
    textAlign: 'center',
  },
  superSized: {
    fontSize: 100,
  },
  upDownButton: {
    marginHorizontal: 15,
  },
});

const App = () => {
  const { backgroundStyle, barStyle, textStyle } = useTheme();

  const [inputWeight, setInputWeight] = useState<number>(150.0);

  return (
    <SafeAreaView style={[backgroundStyle, styles.appView]}>
      <StatusBar barStyle={barStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.allPageContainer]}>
        <ScrollView
          contentContainerStyle={[styles.scrollViewContainer]}
          keyboardShouldPersistTaps="handled">
          <View>
            <Text style={[styles.mainActionText]}>Hellow 👋</Text>
            <Text style={[styles.superSized]}>⚖️</Text>
          </View>
          <InputSpinner
            width={'70%'}
            shadow={true}
            maxLength={5}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            accelerationDelay={750}
            value={inputWeight}
            onChange={setInputWeight}
            inputProps={{
              ...textStyle,
              fontSize: 30,
              minWidth: '20%',
              marginHorizontal: 5,
            }}
            step={0.1}
            precision={1}
            type={'float'}
            buttonLeftImage={<Text style={[styles.mainActionText]}>🥵</Text>}
            buttonRightImage={<Text style={[styles.mainActionText]}>💪</Text>}
            buttonStyle={styles.upDownButton}
            buttonFontSize={100}
            colorPress={'#0F0'}>
            <Text>lbs</Text>
          </InputSpinner>
          <View>
            <Text
              style={[
                styles.mainActionText,
              ]}>{`Actual value = ${inputWeight}`}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
