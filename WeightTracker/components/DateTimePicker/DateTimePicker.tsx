import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DTP from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WTButton from '../WTButton';
import Text from '../ThemedText';
import { useTheme } from '../../hooks';
import { i18n } from '../../utils/i18n';

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    paddingHorizontal: 20,
  },
  modalContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  touchableDatePickerIcon: {
    marginBottom: 20,
  },
  actionStrip: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  actionStripButtonContainer: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 18,
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
  const { backgroundStyle, navBarStyle, textStyle } = useTheme();

  const memoShowPicker = useCallback(
    (pickerShowing: boolean) => () => setShowPicker(pickerShowing),
    [setShowPicker],
  );

  // TODO: replace open modal button with icon button
  // TODO: add date time picker in modal content
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={memoShowPicker(true)}
        style={[styles.touchableDatePickerIcon]}>
        <Ionicons name={'alarm-outline'} size={40} color={textStyle.color} />
      </TouchableOpacity>
      <Modal
        visible={showPicker}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={memoShowPicker(false)}>
        <View style={[backgroundStyle, styles.modalContainer]}>
          <View style={[styles.actionStrip, navBarStyle]}>
            <View style={[styles.actionStripButtonContainer]}>
              <Button
                title={i18n.general_close}
                onPress={memoShowPicker(false)}
              />
            </View>
            <View style={[styles.actionStripButtonContainer]}>
              <Text style={[styles.modalTitle]}>
                {i18n.weightEditor_dateTimePicker_title}
              </Text>
            </View>
            <View style={[styles.actionStripButtonContainer]}>
              <Button
                title={i18n.general_done}
                onPress={() => {
                  // call weight setter
                  memoShowPicker(false)();
                }}
              />
            </View>
          </View>
          <View style={[styles.modalContent]}>
            <WTButton onPress={memoShowPicker(false)}>Done</WTButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePicker;
