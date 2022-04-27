import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsData: (state, { payload }) => {
      console.log(payload);
      state.comments = payload;
    },
    addComment: (state, { payload }) => {
      console.log(payload);
      state.comments.push(payload[0]);
    },
    deleteComment: (state, { payload }) => {
      console.log(payload);
      state.comments = state.comments.filter(
        (comment) => comment.id !== payload
      );
    },
  },
});

export const { setCommentsData, addComment, editComment, deleteComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
