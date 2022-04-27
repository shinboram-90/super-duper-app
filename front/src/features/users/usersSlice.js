import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersData: (state, { payload }) => {
      state.users = payload;
    },
    editUser: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload[0]) {
          return { ...payload[1] };
        }
        return user;
      });
    },
    deleteUser: (state, { payload }) => {
      console.log(payload);
      state.users = state.users.filter((user) => user.id !== payload);
    },
  },
});

export const { setUsersData, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
