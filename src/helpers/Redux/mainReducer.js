import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoadingOverLay: false,
  userId: null,
  backgroundColor: null,
  createNewTaskBackgrounds: [],
  userData: {},
  isDeviceId: false,
  enableDoneLottie: false,
  token: null,
  isLoadingSkeleton: false,
};

export const mainReducer = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {
    setIsLoadingSkeleton: (state, action) => {
      state.isLoadingSkeleton = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingOverLay: (state, action) => {
      state.isLoadingOverLay = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCreateNewTaskBackgrounds: (state, action) => {
      state.createNewTaskBackgrounds.push(action.payload);
    },
    resetCreateNewTaskBackgrounds: state => {
      state.createNewTaskBackgrounds = [];
    },
    setEnableDoneLottie: (state, action) => {
      state.enableDoneLottie = action.payload;
    },
    resetData: () => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setIsLoadingOverLay,
  setBackgroundColor,
  setUserData,
  setCreateNewTaskBackgrounds,
  resetCreateNewTaskBackgrounds,
  setEnableDoneLottie,
  setToken,
  setIsLoadingSkeleton,
  resetData,
} = mainReducer.actions;

export default mainReducer.reducer;
