import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import InputSpinner from 'react-native-input-spinner';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import Text from '../ThemedText';
import { useTheme } from '../../hooks';
import { HomeScreenProps } from '../../utils/navigation';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  fullFlex: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  mainActionText: {
    fontSize: 30,
  },
  superSized: {
    fontSize: 100,
  },
  upDownButton: {
    marginHorizontal: 15,
  },
});

const buzzForWeightChange = () => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
  });
};

const HomeScreen = (_props: HomeScreenProps) => {
  // Accessing params:
  //_props.route.params?.fromHistory;
  const { textStyle } = useTheme();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const [inputWeight, setInputWeight] = useState<number>(150.0);
  const [resultWeight, setResultWeight] = useState<number>(0);
  return (
    <SafeAreaView style={[styles.appView]}>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={[styles.fullWidth, styles.fullFlex]}
        keyboardVerticalOffset={headerHeight}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContainer,
            { paddingBottom: tabBarHeight },
          ]}>
          <Text style={[styles.mainActionText]}>Hellow 👋</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <Text style={[styles.superSized]}>Hi</Text>
          <InputSpinner
            width={'70%'}
            shadow={true}
            maxLength={5}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            accelerationDelay={750}
            value={inputWeight}
            onChange={setInputWeight}
            onIncrease={buzzForWeightChange}
            onDecrease={buzzForWeightChange}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
