import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './hooks';
import appStatusReducer from './appStatus/appStatusSlice';

const store = configureStore({
  reducer: {
    appStatus: appStatusReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector };
export default store;
