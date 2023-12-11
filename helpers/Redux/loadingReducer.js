import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setIsLoading} = LoadingSlice.actions;

export default LoadingSlice.reducer;
