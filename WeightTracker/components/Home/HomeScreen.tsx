import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import InputSpinner from 'react-native-input-spinner';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';

import Text from '../ThemedText';
import { useTheme } from '../../hooks';
import { HomeScreenProps } from '../../utils/navigation';
import { TextStyle } from '../../hooks/theme';
import WTButton from '../WTButton';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  weightPicker: {
    paddingVertical: 40,
  },
  fullFlex: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  mainActionText: {
    fontSize: 25,
  },
  superSized: {
    fontSize: 100,
  },
  upDownButton: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  fixPaddingOnButtonIconImage: {
    paddingLeft: 2,
  },
  scrollerInput: {
    fontSize: 40,
    minWidth: '25%',
    marginHorizontal: 5,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

const buzzForWeightChange = () => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
  });
};

type ScrollerButtonProps = {
  iconName: string;
  textStyle: TextStyle;
};
const ScrollerButton = ({ iconName, textStyle }: ScrollerButtonProps) => (
  <Ionicons
    name={iconName}
    size={30}
    color={textStyle.color}
    style={[styles.fixPaddingOnButtonIconImage]}
  />
);

const HomeScreen = (_props: HomeScreenProps) => {
  // Accessing params:
  //_props.route.params?.fromHistory;
  const { navBarStyle, textStyle, touchFeedbackColor } = useTheme();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollViewRef = useRef(null);

  useScrollToTop(scrollViewRef);

  const [inputWeight, setInputWeight] = useState<number>(150.0);

  return (
    <SafeAreaView style={[styles.appView]}>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={[styles.fullWidth, styles.fullFlex]}
        keyboardVerticalOffset={headerHeight}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollViewContainer,
            { paddingBottom: tabBarHeight },
          ]}>
          <View>
            <Text style={[styles.mainActionText]}>Enter your weight:</Text>
          </View>
          <InputSpinner
            style={[styles.weightPicker]}
            maxLength={5}
            accelerationDelay={200}
            value={inputWeight}
            onChange={setInputWeight}
            onIncrease={buzzForWeightChange}
            onDecrease={buzzForWeightChange}
            inputProps={{
              ...textStyle,
              ...styles.scrollerInput,
            }}
            step={0.1}
            precision={1}
            type={'float'}
            buttonLeftImage={
              <ScrollerButton iconName="remove" textStyle={textStyle} />
            }
            buttonRightImage={
              <ScrollerButton iconName="add" textStyle={textStyle} />
            }
            buttonStyle={{
              ...styles.upDownButton,
              ...navBarStyle,
            }}
            colorPress={touchFeedbackColor}>
            <Text>lbs</Text>
          </InputSpinner>
          <View style={[styles.flexDirectionRow]}>
            <WTButton
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
              confirmOptions={{
                title: 'Are you sure?',
                message: `You are about to save a weight of ${inputWeight}lbs to Apple Health.`,
                canceleable: true,
                confirmButtonText: 'Save',
              }}>
              Save to Health
            </WTButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
