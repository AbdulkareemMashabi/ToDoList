import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  userId: null,
  backgroundColor: null,
};

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const {setIsLoading, setUserId, setBackgroundColor} =
  LoadingSlice.actions;

export default LoadingSlice.reducer;
