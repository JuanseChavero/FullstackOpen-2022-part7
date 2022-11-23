import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import loggedUserReducer from './reducers/loggedUserReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: loggedUserReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
