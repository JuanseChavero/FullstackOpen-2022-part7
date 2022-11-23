import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import usersService from '../../services/users';
import login from '../../services/login';
import { notify } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const addTokenForServices = (user) => {
  blogService.setToken(user.token);
  usersService.setToken(user.token);
};

const removeTokenForServices = () => {
  blogService.setToken(null);
  usersService.setToken(null);
};

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      dispatch(setUser(user));
      addTokenForServices(user);
    } catch (error) {
      const errorMessage = error.response.data.error;
      dispatch(notify(`${errorMessage}`, 'error', 5));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    await dispatch(setUser(null));
    window.localStorage.removeItem('loggedBlogAppUser');
    removeTokenForServices();
  };
};
