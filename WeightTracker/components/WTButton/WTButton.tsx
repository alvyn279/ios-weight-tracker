import React from 'react';
import {
  Alert,
  AlertButton,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks';
import ThemedText from '../ThemedText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1.5,
  },
  buttonText: {
    fontSize: 20,
  },
});

type WTButtonType = {
  onPress: Function;
  confirmOptions?: {
    title: string;
    message: string;
    canceleable: boolean;
    confirmButtonText: string;
  };
};

export const WTButton: React.FC<WTButtonType> = props => {
  const { navBarStyle, buttonTextPrimaryColor } = useTheme();

  const handlePress = () => {
    if (!props.confirmOptions) {
      props.onPress();
      return;
    }

    const alertButtons: AlertButton[] = [
      {
        text: props.confirmOptions.confirmButtonText,
        style: 'default',
        onPress: props.onPress as any,
      },
    ];

    if (props.confirmOptions.canceleable) {
      alertButtons.unshift({
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      });
    }

    Alert.alert(
      props.confirmOptions.title,
      props.confirmOptions.message,
      alertButtons,
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button, navBarStyle]}
        onPress={handlePress}>
        <ThemedText style={[styles.buttonText, buttonTextPrimaryColor]}>
          {props.children}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
