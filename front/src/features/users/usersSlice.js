import { current } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  user: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      console.log(payload);
      console.log(payload[0].id);
      console.log(current(state));
      state.user = state.users.find((user) => user.id === payload[0].id);
    },
    setUsersData: (state, { payload }) => {
      console.log(payload);
      state.users = payload;
    },
    editUser: (state, { payload }) => {
      console.log(payload[1]);
      // state.users = state.users.map((user) => {
      //   if (user.id === payload[0]) {
      //     return [...payload];
      //   }
      //   return user;
      // });
      state.users = state.users.map((user) => {
        if (user.id === payload[0]) {
          console.log(payload[1]);
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

export const { setUserData, setUsersData, editUser, deleteUser } =
  usersSlice.actions;

export default usersSlice.reducer;
