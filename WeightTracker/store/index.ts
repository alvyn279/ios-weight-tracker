import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector, useUnwrapAsyncThunk } from './hooks';
import appStatusReducer from './appStatus';
import weightsReducer from './weights';
import preferencesReducer from './preferences';

const store = configureStore({
  reducer: {
    appStatus: appStatusReducer,
    weights: weightsReducer,
    preferences: preferencesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector, useUnwrapAsyncThunk };
export default store;
