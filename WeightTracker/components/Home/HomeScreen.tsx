import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import AppleHealthKit, { HealthValue } from 'react-native-health';

import Text from '../ThemedText';
import { useTheme } from '../../hooks';
import { HomeScreenProps } from '../../utils/navigation';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  allPageContainer: {
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

const HomeScreen = (_props: HomeScreenProps) => {
  // Accessing params:
  //_props.route.params?.fromHistory;
  const { backgroundStyle, barStyle, textStyle } = useTheme();

  const [inputWeight, setInputWeight] = useState<number>(150.0);
  const [resultWeight, setResultWeight] = useState<number>(0);
  return (
    <SafeAreaView style={[backgroundStyle, styles.appView]}>
      <StatusBar barStyle={barStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.allPageContainer]}>
        <ScrollView
          contentContainerStyle={[styles.scrollViewContainer]}
          keyboardShouldPersistTaps="handled">
          <>
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
            <Button
              title="list weight"
              onPress={() => {
                let listWeightOptions = {
                  startDate: new Date(2021, 0, 0).toISOString(), // required
                  endDate: new Date().toISOString(), // optional; default now
                  ascending: false, // optional; default false
                  limit: 10, // optional; default no limit
                };

                AppleHealthKit.getWeightSamples(
                  listWeightOptions,
                  (err: Object, results: Array<HealthValue>) => {
                    if (err) {
                      return;
                    }
                    setResultWeight(results[results.length - 1].value);
                  },
                );
              }}
            />
            <Button
              title="clear weight"
              onPress={() => {
                setResultWeight(0);
              }}
            />
            <View>
              <Text
                style={[
                  styles.mainActionText,
                ]}>{`Last weight = ${resultWeight}`}</Text>
            </View>
            <Button
              title="save weight"
              onPress={() => {
                let saveWeightOptions = {
                  value: inputWeight,
                };

                AppleHealthKit.saveWeight(
                  saveWeightOptions,
                  (err: string, result: HealthValue) => {
                    if (err) {
                      console.log('error saving weight to Healthkit: ', err);
                      return;
                    }
                    console.log(result.value);
                  },
                );
              }}
            />
          </>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;