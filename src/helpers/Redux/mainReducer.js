import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  userId: null,
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
  },
});

export const {setIsLoading, setUserId} = LoadingSlice.actions;

export default LoadingSlice.reducer;
