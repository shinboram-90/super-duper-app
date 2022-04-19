import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('api/posts');
  return response.data.postList;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    try {
      const response = await axios.post('api/posts', initialPost);
      return response.data.newPost;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.delete(`api/posts/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.post(`api/posts/${id}`, initialPost);
      return response.data.modifiedPost;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        postsAdapter.addOne(state, action.payload);
        console.log(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete');
          console.log(`payloadd: ${action.payload}`);
          return;
        }
        postsAdapter.upsertOne(state, action.payload);
      });
  },
});

// export const { postAdded, postUpdated } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
