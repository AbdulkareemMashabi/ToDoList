import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  UID: null,
};

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUID: (state, action) => {
      state.UID = action.payload;
    },
  },
});

export const {setIsLoading, setUID} = LoadingSlice.actions;

export default LoadingSlice.reducer;
