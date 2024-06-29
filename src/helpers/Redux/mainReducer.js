import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoadingOverLay: false,
  userId: null,
  backgroundColor: null,
  createNewTaskBackgrounds: [],
  userData: {},
  isDeviceId: false,
  enableLoading: false,
};

export const mainReducer = createSlice({
  name: 'mainReducer',
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
    setCreateNewTaskBackgrounds: (state, action) => {
      state.createNewTaskBackgrounds.push(action.payload);
    },
    resetCreateNewTaskBackgrounds: state => {
      state.createNewTaskBackgrounds = [];
    },
    setIsDeviceId: state => {
      state.isDeviceId = true;
    },
    setEnableLoading: (state, action) => {
      state.enableLoading = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsLoadingOverLay,
  setUserId,
  setBackgroundColor,
  setUserData,
  setCreateNewTaskBackgrounds,
  resetCreateNewTaskBackgrounds,
  setIsDeviceId,
  setEnableLoading,
} = mainReducer.actions;

export default mainReducer.reducer;
