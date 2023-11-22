import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  page: 'Lottie',
};

export const currentPageSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {setPage} = currentPageSlice.actions;

export default currentPageSlice.reducer;
