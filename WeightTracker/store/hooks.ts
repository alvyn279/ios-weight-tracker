import { useCallback } from 'react';
import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Returns a dispatch function provider that will in turn return a Promise
// of generic thunk result type.
export type UnwrapAsyncThunkResult = <ResultType extends unknown>(
  asyncThunk: AsyncThunkAction<ResultType, any, any>,
) => Promise<ResultType>;

export const useUnwrapAsyncThunk = (): UnwrapAsyncThunkResult => {
  const dispatch = useAppDispatch();

  return useCallback(
    <T extends any>(asyncThunk: AsyncThunkAction<T, any, any>): Promise<T> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch],
  );
};
