import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoadingOverLay: false,
  userId: null,
  backgroundColor: null,
  userData: {},
};

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingOverLay: (state, action) => {
      state.isLoadingOverLay = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsLoadingOverLay,
  setUserId,
  setBackgroundColor,
  setUserData,
} = LoadingSlice.actions;

export default LoadingSlice.reducer;
