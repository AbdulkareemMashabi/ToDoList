import {configureStore} from '@reduxjs/toolkit';
import loadingReducer from './loadingReducer';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
