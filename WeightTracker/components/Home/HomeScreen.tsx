import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
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
  selectSaveWeight,
} from '../../store/weights/selectors';
import {
  fetchLatestWeight,
  saveWeight,
  SaveWeightDTO,
} from '../../store/weights';
import { HealthUnit } from '../../utils/constants';
import { useScreenAwareFeatures } from '../../hooks/theme';

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'column',
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
  const { heights } = useScreenAwareFeatures();
  const scrollViewRef = useRef(null);
  const dispatch = useAppDispatch();
  const dispatchUnwrap = useUnwrapAsyncThunk();

  const initialWeight = useAppSelector<number | undefined>(selectLatestWeight);
  const preferredUnit = useAppSelector<HealthUnit>(selectPreferredWeightUnit);
  const { saving: saveWeightLoading, error: saveWeightError } =
    useAppSelector(selectSaveWeight);

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
        style={[styles.fullWidth, styles.fullFlex]}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[{ paddingBottom: heights.tabBarHeight }]}>
          {/* TODO: handle no weight is present */}
          {initialWeight !== undefined ? (
            <WeightEditor
              initialWeight={initialWeight}
              weightUnit={preferredUnit}
              onSavePress={onSavePress}
              saveWeightLoading={saveWeightLoading}
              saveWeightError={saveWeightError}
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
