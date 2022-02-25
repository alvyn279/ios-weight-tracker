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
    height: 52,
  },
  actionStripButtonContainer: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 18,
  },
  iosDateTimePicker: {
    paddingVertical: 10,
    flexDirection: 'column',
  },
});

interface OptionsPickerProps {
  onDateTimeChange(date: Date): void;
}
/**
 * Button component that will pop up a modal allowing the user to pick
 * a date & time, and unit.
 */
const OptionsPicker: React.FC<OptionsPickerProps> = _props => {
  const now = new Date();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<Date>(now);
  const { backgroundStyle, navBarStyle, textStyle } = useTheme();

  const memoShowPicker = useCallback(
    (pickerShowing: boolean) => () => setShowPicker(pickerShowing),
    [setShowPicker],
  );

  const ActionStrip = () => (
    <View style={[styles.actionStrip, navBarStyle]}>
      <View style={[styles.actionStripButtonContainer]}>
        <Button title={i18n.general_cancel} onPress={memoShowPicker(false)} />
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
  );

  // TODO: create section list view for choosing date, time, unit
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={memoShowPicker(true)}
        style={[styles.touchableDatePickerIcon]}>
        <Ionicons name={'options-outline'} size={40} color={textStyle.color} />
      </TouchableOpacity>
      <Modal
        visible={showPicker}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={memoShowPicker(false)}>
        <View style={[backgroundStyle, styles.modalContainer]}>
          <ActionStrip />
          <View style={[styles.modalContent]}>
            <View style={[styles.iosDateTimePicker]}>
              <DTP
                mode={'datetime'}
                display={'inline'}
                value={dateTime}
                maximumDate={now}
                onChange={(_event, date) => {
                  if (date) {
                    setDateTime(date);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OptionsPicker;
