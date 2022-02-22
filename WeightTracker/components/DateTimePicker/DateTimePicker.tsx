import React, { useCallback, useState } from 'react';
import DTP from '@react-native-community/datetimepicker';
import { Modal, StyleSheet, View } from 'react-native';

import WTButton from '../WTButton';
import Text from '../ThemedText';
import { useTheme } from '../../hooks';

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 20,
  },
});

interface DateTimePickerProps {
  onDateTimeChange(date: Date): void;
}
/**
 * Button component that will pop up a modal allowing the user to pick
 * a date & time. Datetime object is pass in callback when user is done.
 */
const DateTimePicker: React.FC<DateTimePickerProps> = _props => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { backgroundStyle } = useTheme();

  const memoShowPicker = useCallback(
    (pickerShowing: boolean) => () => setShowPicker(pickerShowing),
    [setShowPicker],
  );

  // TODO: replace open modal button with icon button
  // TODO: add date time picker in modal content
  return (
    <View style={styles.container}>
      <WTButton onPress={memoShowPicker(true)}>Open modal</WTButton>
      <Modal
        visible={showPicker}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={memoShowPicker(false)}>
        <View style={[backgroundStyle, styles.modalContent]}>
          <Text>Allo</Text>
          <WTButton onPress={memoShowPicker(false)}>Done</WTButton>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePicker;
