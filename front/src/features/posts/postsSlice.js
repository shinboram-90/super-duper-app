// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../api/axios';

// const initialState = {
//   posts: [],
//   loading: false,
// };

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await axios.get('api/posts');
//   return response.data.postList;
// });

// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   async (initialPost) => {
//     try {
//       const response = await axios.post('api/posts', initialPost);
//       return response.data.newPost;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// export const deletePost = createAsyncThunk(
//   'posts/deletePost',
//   async (initialPost) => {
//     const { id } = initialPost;
//     const response = await axios.delete(`api/posts/${id}`);
//     if (response?.status === 200) return initialPost;
//     return `${response?.status}: ${response?.statusText}`;
//   }
// );

// export const updatePost = createAsyncThunk(
//   'posts/updatePost',
//   async (initialPost) => {
//     const { id } = initialPost;
//     try {
//       const response = await axios.post(`api/posts/${id}`, initialPost);
//       return response.data.modifiedPost;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchPosts.pending]: (state, action) => {
//       state.loading = true;
//     },
//     [fetchPosts.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.posts = action.payload;
//     },
//     [fetchPosts.rejected]: (state, action) => {
//       state.loading = false;
//       console.log(action);
//     },
//     // .addCase(addNewPost.fulfilled, postsAdapter.addOne)
//     [addNewPost.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.posts = [action.payload, ...state.posts];
//     },
//     [deletePost.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.posts = state.posts.filter((el) => el.id !== action.payload);
//     },
//     [updatePost.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.posts = state.posts.map((el) =>
//         el.id === action.payload.id ? action.payload : el
//       );
//     },
//   },
// });

// export default postsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // getOnePost: (state, { payload }) => {
    //   state.posts = state.posts.find((post) => post.id === payload);
    // },
    setPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
      // state.posts = [...state.posts, payload];
    },
    editPost: (state, { payload }) => {
      // state[i]= payload.data
      // state.posts = state.posts.map((post) => {
      //   if (post.id === payload) {
      //     return {
      //       ...post,
      //       data: payload.data,
      //     };
      //   } else {
      //     return post;
      //   }
      // });
      const postIndex = state.posts.findIndex((post) => post.id === payload);
      if (postIndex >= 0) {
        state[postIndex] = payload;
      }
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
  },
});

export const { setPostsData, addPost, editPost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
