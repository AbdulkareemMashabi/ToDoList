import {configureStore} from '@reduxjs/toolkit';
import currentPageReducer from './currentPageReducer';

export const store = configureStore({
  reducer: {
    paging: currentPageReducer,
  },
});
