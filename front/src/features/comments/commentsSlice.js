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
      state.comments.push(payload);
      // state.comments = [...state.comments, payload];
    },
    editComment: (state, { payload }) => {
      // state.comments = state.comments.map((comment) => {
      //   if (comment.id === payload[0]) {
      //     return { ...payload[1].comment };
      //   }
      //   return comment;
      // });
      // const commentIndex = state.comments.findIndex((comment) => comment.id === payload);
      // if (commentIndex >= 0) {
      //   state.commentIndex = { ...payload };
      // }
      const index = state.comments.findIndex(
        (comment) => comment.id === payload[0]
      );
      state[index] = {
        ...state[index],
        ...payload,
      };
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

// export const selectPostsByUser = createSelector(
//   [setCommentsData, (state, postId) => postId],
//   (comments, postId) => comments.filter((comment) => comment.post_id === postId)
// );
export default commentsSlice.reducer;
