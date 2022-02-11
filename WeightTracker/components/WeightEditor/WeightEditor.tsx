import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { HealthValue } from 'react-native-health';
import InputSpinner from 'react-native-input-spinner';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Modal, { ScaleAnimation, ModalContent } from 'react-native-modals';

import Text from '../ThemedText';
import WTButton from '../WTButton';
import { useTheme } from '../../hooks';
import { TextStyle } from '../../hooks/theme';
import { HealthUnit } from '../../utils/constants';
import { SaveWeightDTO } from '../../store/weights';

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
  successModal: {
    height: 200,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  onSavePress(dto: SaveWeightDTO): Promise<HealthValue>;
}

const WeightEditor: React.FC<WeightEditorProps> = props => {
  const { navBarStyle, textStyle, touchFeedbackColor, modalBackgroundStyle } =
    useTheme();
  const [inputWeight, setInputWeight] = useState<number>(props.initialWeight);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [saveEnabled, setSaveEnabled] = useState<boolean>(true);

  const handleAsyncSave = async () => {
    try {
      // TODO: use loading state from redux
      setSaveEnabled(false);
      setModalOpen(true);
      // const heatlhValue = await props.onSavePress({
      //   value: inputWeight,
      //   // TODO: use date from datetime picker
      //   date: new Date(),
      // });
      setSaveEnabled(true);
    } catch (error) {
      console.warn(error);
    }
  };

  const SuccessModal = () => {
    return (
      <Modal
        visible={modalOpen}
        modalAnimation={new ScaleAnimation()}
        onTouchOutside={() => {
          setModalOpen(false);
        }}>
        <ModalContent style={[styles.successModal, modalBackgroundStyle]}>
          {saveEnabled ? (
            <LottieView
              source={require('../../utils/animations/checkmark.json')}
              autoPlay
              loop={false}
              speed={0.7}
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </ModalContent>
      </Modal>
    );
  };

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
        colorPress={touchFeedbackColor}
      />
      <View style={[styles.flexDirectionRow]}>
        <WTButton
          disabled={!saveEnabled}
          onPress={handleAsyncSave}
          confirmOptions={{
            title: 'Are you sure?',
            message: `You are about to save a weight of ${inputWeight}lbs to Apple Health.`,
            canceleable: true,
            confirmButtonText: 'Save',
          }}>
          Save to Health
        </WTButton>
      </View>
      <SuccessModal />
    </View>
  );
};

export default WeightEditor;
