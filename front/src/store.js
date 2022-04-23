import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../src/features/posts/postsSlice';
import usersReducer from '../src/features/users/usersSlice';
import commentsReducer from '../src/features/comments/commentsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});
