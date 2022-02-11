import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';

import WeightEditor from '../WeightEditor';
import { HomeScreenProps } from '../../utils/navigation';
import {
  useAppDispatch,
  useAppSelector,
  useUnwrapAsyncThunk,
} from '../../store';
import {
  selectLatestWeight,
  selectPreferredWeightUnit,
} from '../../store/weights/selectors';
import {
  fetchLatestWeight,
  saveWeight,
  SaveWeightDTO,
} from '../../store/weights';
import { HealthUnit } from '../../utils/constants';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  fullFlex: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  loader: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = (_props: HomeScreenProps) => {
  // Accessing params:
  //_props.route.params?.fromHistory;
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollViewRef = useRef(null);
  const dispatch = useAppDispatch();
  const dispatchUnwrap = useUnwrapAsyncThunk();

  const initialWeight = useAppSelector<number | undefined>(selectLatestWeight);
  const preferredUnit = useAppSelector<HealthUnit>(selectPreferredWeightUnit);

  useScrollToTop(scrollViewRef);

  useEffect(() => {
    dispatch(fetchLatestWeight());
  }, [dispatch]);

  const onSavePress = useCallback(
    (saveWeightDto: SaveWeightDTO) => {
      return dispatchUnwrap(saveWeight(saveWeightDto));
    },
    [dispatchUnwrap],
  );

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
          {/* TODO: handle no weight is present */}
          {initialWeight !== undefined ? (
            <WeightEditor
              initialWeight={initialWeight}
              weightUnit={preferredUnit}
              onSavePress={onSavePress}
            />
          ) : (
            <ActivityIndicator style={[styles.loader]} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
