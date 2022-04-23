import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // getOnecomment: (state, { payload }) => {
    //   const comment = state.comments.find((comment) => comment.id === payload);
    //   console.log(comment);
    //   return comment;
    // },
    setcommentsData: (state, { payload }) => {
      state.comments = payload;
    },
    addcomment: (state, { payload }) => {
      console.log(payload);
      state.comments.unshift(payload);
      // state.comments = [...state.comments, payload];
    },
    editcomment: (state, { payload }) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === payload[0]) {
          return { ...payload[1].comment };
        }
        return comment;
      });
      // const commentIndex = state.comments.findIndex((comment) => comment.id === payload);
      // if (commentIndex >= 0) {
      //   state.commentIndex = { ...payload };
      // }
      // const index = state.comments.findIndex((comment) => comment.id === payload[0]);
      // state[index] = {
      //   ...state[index],
      //   ...payload,
      // };
    },
    deletecomment: (state, { payload }) => {
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
