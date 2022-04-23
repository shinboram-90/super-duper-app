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
        console.log(payload);
        if (user.id === payload[0]) {
          return { ...payload[1].user };
        }
        return user;
      });
      // const postIndex = state.posts.findIndex((post) => post.id === payload);
      // if (postIndex >= 0) {
      //   state.postIndex = { ...payload };
      // }
      // const index = state.posts.findIndex((post) => post.id === payload[0]);
      // state[index] = {
      //   ...state[index],
      //   ...payload,
      // };
    },
    deleteUser: (state, { payload }) => {
      console.log(payload);
      state.users = state.users.filter((user) => user.id !== payload);
    },
  },
});

export const { setUsersData, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
