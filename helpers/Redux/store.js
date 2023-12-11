import {configureStore} from '@reduxjs/toolkit';
import currentPageReducer from './currentPageReducer';
import loadingReducer from './loadingReducer';

export const store = configureStore({
  reducer: {
    paging: currentPageReducer,
    loading: loadingReducer,
  },
});
