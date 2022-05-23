import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { HealthValue } from 'react-native-health';
import InputSpinner from 'react-native-input-spinner';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Modal, { ScaleAnimation, ModalContent } from 'react-native-modals';
import { SerializedError } from '@reduxjs/toolkit';

import Text from '../ThemedText';
import WTButton from '../WTButton';
import OptionsPicker from '../OptionsPicker';
import { useTheme, useScreenAwareFeatures } from '../../hooks';
import { TextStyle } from '../../hooks/theme';
import { HealthUnit } from '../../utils/constants';
import { SaveWeightDTO } from '../../store/weights';
import { i18n } from '../../utils/i18n';

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
  successModal: {
    height: 200,
    width: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIcon: {
    height: 100,
    width: 100,
  },
  centerAlignText: {
    textAlign: 'center',
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
  // TODO: use weight unit in compoenent
  readonly weightUnit: HealthUnit;
  onSavePress(dto: SaveWeightDTO): Promise<HealthValue>;
  readonly saveWeightLoading: boolean;
  readonly saveWeightError: SerializedError | null;
}

const WeightEditor: React.FC<WeightEditorProps> = props => {
  const { navBarStyle, textStyle, touchFeedbackColor, modalBackgroundStyle } =
    useTheme();
  const [inputWeight, setInputWeight] = useState<number>(props.initialWeight);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { heights } = useScreenAwareFeatures();

  const handleAsyncSave = () => {
    setModalOpen(true);
    props
      .onSavePress({
        value: inputWeight,
        // TODO: use date from datetime picker
        date: new Date(),
      })
      .then((healthValue: HealthValue) => {
        console.log(healthValue);
      })
      .catch(_error => {});
  };

  const SaveWeightStatusModal = () => {
    return (
      <Modal
        visible={modalOpen}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setModalOpen(false);
        }}
        overlayOpacity={0.3}
        animationDuration={500}>
        <ModalContent style={[styles.successModal, modalBackgroundStyle]}>
          {props.saveWeightLoading ? (
            <ActivityIndicator size="large" />
          ) : props.saveWeightError ? (
            <>
              <View style={[styles.warningIcon]}>
                <LottieView
                  source={require('../../utils/animations/warning.json')}
                  autoPlay
                  loop={true}
                  speed={0.6}
                />
              </View>
              <Text style={[styles.centerAlignText]}>
                {i18n.general_somethingWentWrong}{' '}
                {props.saveWeightError.message}
              </Text>
            </>
          ) : (
            <LottieView
              source={require('../../utils/animations/checkmark.json')}
              autoPlay
              loop={false}
              speed={0.6}
            />
          )}
        </ModalContent>
      </Modal>
    );
  };

  return (
    <View
      style={[
        styles.weightEditorContainer,
        { minHeight: heights.viewportHeight },
      ]}>
      <Text style={[styles.mainActionText]}>
        {i18n.weightEditor_enterWeight_prompt}
      </Text>
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
        colorPress={touchFeedbackColor}
      />
      {/* TODO: pass state change for date time */}
      <OptionsPicker onDateTimeChange={() => {}} />
      <WTButton
        disabled={props.saveWeightLoading}
        onPress={handleAsyncSave}
        confirmOptions={{
          title: i18n.general_areYouSure,
          message: i18n.weightEditor_enterWeight_confirm_message(inputWeight),
          canceleable: true,
          confirmButtonText: i18n.general_save,
        }}>
        {i18n.weightEditor_enterWeight_save}
      </WTButton>
      <SaveWeightStatusModal />
    </View>
  );
};

export default WeightEditor;
