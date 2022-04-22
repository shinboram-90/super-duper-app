// import {
//   createSlice,
//   createAsyncThunk,
//   createSelector,
//   createEntityAdapter,
// } from '@reduxjs/toolkit';

// import axios from '../../api/axios';

// const postsAdapter = createEntityAdapter({
//   // selectId: (post) => post.id,
//   // sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

// const initialState = postsAdapter.getInitialState({
//   posts: [],
//   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// });

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await axios.get('api/posts');
//   console.log(response.data);
//   return response.data.postList;
// });

// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   async (initialPost) => {
//     const response = await axios.post('api/posts', initialPost);
//     console.log(response.data.newPost);
//     return response.data;
//   }
// );

// export const updatePost = createAsyncThunk(
//   'posts/updatePost',
//   async (initialPost) => {
//     const { id } = initialPost;
//     // try-catch block only for development/testing with fake API
//     // otherwise, remove try-catch and add updatePost.rejected case
//     try {
//       const response = await axios.put(`api/posts/${id}`, initialPost);
//       return response.data.modifications;
//     } catch (err) {
//       //return err.message;
//       return initialPost; // only for testing Redux!
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

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     // reactionAdded(state, action) {
//     //   const { postId, reaction } = action.payload;
//     //   const existingPost = state.entities[postId];
//     //   if (existingPost) {
//     //     existingPost.reactions[reaction]++;
//     //   }
//     // },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Adding date and reactions

//         const loadedPosts = action.payload.map((post) => {
//           // post.date = sub(new Date(), { minutes: min++ }).toISOString();

//           return post;
//         });

//         // Add any fetched posts to the array
//         postsAdapter.upsertMany(state, loadedPosts);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         // action.payload.id = action.payload.postCreated.insertId;
//         // action.payload = action.payload.newPost;
//         state.posts.unshift(action.payload);

//         // postsAdapter.setOne(state, action.payload);
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log('Update could not complete');
//           console.log(action.payload);
//           return;
//         }
//         // action.payload.date = new Date().toISOString();
//         postsAdapter.upsertOne(state, action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log('Delete could not complete');
//           console.log(action.payload);
//           return;
//         }
//         const { id } = action.payload;
//         postsAdapter.removeOne(state, id);
//       });
//   },
// });

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
//   // Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors((state) => state.posts);

// export const getPostsStatus = (state) => state.posts.status;
// export const getPostsError = (state) => state.posts.error;
// // export const getCount = (state) => state.posts.count;

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

// // export const { increaseCount, reactionAdded } = postsSlice.actions

// export default postsSlice.reducer;

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
//   async (post, { rejectWithValue }) => {
//     const { id, title, content, image } = post;
//     try {
//       const response = await axios.put(`api/posts/${id}`, {
//         title,
//         content,
//         image,
//       });
//       console.log(response.data.modifications);
//       return response.data.modifications;
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
//       state.posts = state.posts.filter((el) => el.id !== action.payload.id);
//     },
//     [updatePost.fulfilled]: (state, action) => {
//       state.loading = false;
//       // state.posts = state.posts.map((el) =>
//       //   el.id === action.payload ? action.payload : el
//       // );
//       // const index = state.posts.findIndex(
//       //   (post) => post.id === action.payload.id
//       // );
//       // state[index] = {
//       //   ...state[index],
//       //   ...action.payload,
//       // };

//       const updatedPosts = state.posts.map((post) =>
//         post.id === action.payload.id ? action.payload : post
//       );
//       return {
//         ...state,
//         posts: updatedPosts,
//       };
//       // const filtered = state.posts.filter(
//       //   (post) => post.id !== action.payload.id
//       // );
//       // console.log(action.post);
//       // return [...filtered, action.payload];
//       // const post = state.posts.find((post) => post.id === action.payload.id);

//       //this one works...
//       // const postIndex = state.posts.findIndex(
//       //   (post) => post.id === action.payload.id
//       // );
//       // if (postIndex >= 0) {
//       //   state.postIndex = action.payload;
//       // }
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
    //   const post = state.posts.find((post) => post.id === payload);
    //   console.log(post);
    //   return post;
    // },
    setPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      console.log(payload);
      state.posts.unshift(payload);
      // state.posts = [...state.posts, payload];
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        console.log(payload);
        if (post.id === payload[0].id) {
          return { ...payload[0].post };
        }
        return post;
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
    deletePost: (state, { payload }) => {
      console.log(payload);
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
  },
});

export const { setPostsData, addPost, editPost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
