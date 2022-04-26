import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload[0]);
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          return { ...payload[1].post };
        }
        return post;
      });
    },
    deletePost: (state, { payload }) => {
      console.log(payload);
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
  },
});

export const { setPostsData, addPost, editPost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
