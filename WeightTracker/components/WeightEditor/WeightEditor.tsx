import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Text from '../ThemedText';
import WTButton from '../WTButton';
import { useTheme } from '../../hooks';
import { TextStyle } from '../../hooks/theme';
import { HealthUnit } from '../../utils/constants';

const styles = StyleSheet.create({
  weightEditorContainer: {
    flex: 1,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  weightPicker: {
    paddingVertical: 40,
  },
  mainActionText: {
    fontSize: 25,
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

export interface WeightEditorProps {
  readonly initialWeight: number;
  readonly weightUnit: HealthUnit;
  readonly onSavePress: Function;
}

const WeightEditor: React.FC<WeightEditorProps> = props => {
  const { navBarStyle, textStyle, touchFeedbackColor } = useTheme();
  const [inputWeight, setInputWeight] = useState<number>(props.initialWeight);

  return (
    <View style={[styles.weightEditorContainer]}>
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
        <Text>{}</Text>
      </InputSpinner>
      <View style={[styles.flexDirectionRow]}>
        <WTButton
          onPress={() => {
            // TODO: use props.onSavePress
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
    </View>
  );
};

export default WeightEditor;
