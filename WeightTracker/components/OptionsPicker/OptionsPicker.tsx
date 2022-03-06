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

import Text from '../ThemedText';
import { useTheme } from '../../hooks';
import { i18n } from '../../utils/i18n';
import KeyValueTable, { KeyValueItem } from '../KeyValueTable';

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  modalContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  touchableOptionsIcon: {
    marginBottom: 20,
  },
  actionStrip: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  actionStripButtonContainer: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 18,
  },
  datePicker: {
    width: 200,
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
  const { backgroundStyle, modalBackgroundStyle, textStyle } = useTheme();

  const memoShowPicker = useCallback(
    (pickerShowing: boolean) => () => setShowPicker(pickerShowing),
    [setShowPicker],
  );

  const ActionStrip = () => (
    <View style={[styles.actionStrip, modalBackgroundStyle]}>
      <View style={[styles.actionStripButtonContainer]}>
        <Button title={i18n.general_cancel} onPress={memoShowPicker(false)} />
      </View>
      <View style={[styles.actionStripButtonContainer]}>
        <Text style={[styles.modalTitle]}>
          {i18n.weightEditor_options_title}
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

  const optionsItems: Array<KeyValueItem> = [
    {
      key: i18n.weightEditor_options_dateTime,
      value: (
        <DTP
          mode={'datetime'}
          value={dateTime}
          maximumDate={now}
          onChange={(_event, date) => {
            if (date) {
              setDateTime(date);
            }
          }}
          style={[styles.datePicker]}
        />
      ),
    },
    {
      key: i18n.weightEditor_options_unit,
      // TODO: implement a unit picker
      value: 'Picker for unit',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={memoShowPicker(true)}
        style={[styles.touchableOptionsIcon]}>
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
            <KeyValueTable items={optionsItems} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OptionsPicker;
