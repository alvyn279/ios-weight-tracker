import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';

import WeightEditor from '../WeightEditor';
import { HomeScreenProps } from '../../utils/navigation';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectLatestWeight,
  selectLatestWeightLoading,
  selectPreferredWeightUnit,
} from '../../store/weights/selectors';
import { fetchLatestWeight } from '../../store/weights';
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

const MIN_REFRESH_DELAY = 3000;

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = (_props: HomeScreenProps) => {
  // Accessing params:
  //_props.route.params?.fromHistory;
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollViewRef = useRef(null);
  const dispatch = useAppDispatch();

  const initialWeight = useAppSelector<number | undefined>(selectLatestWeight);
  const preferredUnit = useAppSelector<HealthUnit>(selectPreferredWeightUnit);

  const [refreshing, setRefreshing] = React.useState(false);

  useScrollToTop(scrollViewRef);

  useEffect(() => {
    dispatch(fetchLatestWeight());
  }, [dispatch]);

  const refreshLatestWeight = useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    setRefreshing(false);
    console.warn('lol');
  }, [setRefreshing]);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        style={{
          backgroundColor: 'red',
        }}
        refreshing={true}
        // onRefresh={refreshLatestWeight}
        // progressViewOffset={100}
      />
    ),
    [],
  );

  return (
    // <SafeAreaView style={[styles.appView]}>
    //   <KeyboardAvoidingView
    //     behavior={'padding'}
    //     style={[styles.fullWidth, styles.fullFlex]}
    //     keyboardVerticalOffset={headerHeight}>
    <ScrollView
      ref={scrollViewRef}
      refreshControl={refreshControl}
      // contentContainerStyle={[
      //   styles.scrollViewContainer,
      //   {
      //     paddingBottom: tabBarHeight,
      //     height: 20000,
      //   },
      // ]}
    >
      {initialWeight !== undefined ? (
        <WeightEditor
          initialWeight={initialWeight}
          weightUnit={preferredUnit}
          onSavePress={() => {}}
        />
      ) : (
        <ActivityIndicator style={[styles.loader]} />
      )}
    </ScrollView>
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

export default HomeScreen;
