import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: 'info',
  },
  reducers: {
    setNotification: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    },

    clearNotification: (state) => {
      state.message = '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let timeoutID;

export const notify = (
  message,
  type = 'success' | 'info' | 'warning' | 'error',
  seconds,
) => {
  return (dispatch) => {
    clearTimeout(timeoutID);
    dispatch(setNotification({ message, type }));

    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
