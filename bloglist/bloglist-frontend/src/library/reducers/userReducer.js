import { createSlice } from '@reduxjs/toolkit';
import usersService from '../../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload;
      return users;
    },
    editUser: (state, action) => {
      const updatedUser = action.payload;
      return state.filter((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      );
    },
  },
});

export const { setUsers, editUser } = usersSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const refreshUser = (userId) => {
  return async (dispatch) => {
    const updatedUser = await usersService.getById(userId);
    dispatch(editUser(updatedUser));
  };
};

export default usersSlice.reducer;
