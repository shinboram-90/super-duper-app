import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { editComment } from './commentsSlice';
import { useDispatch } from 'react-redux';

const EditCommentForm = ({ postId, comment }) => {
  const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();

  const { auth } = useAuth();
  const userId = auth.id;

  const onEditCommentClick = async (e) => {
    e.preventDefault();

    const updatedComment = {
      content: content,
      user_id: userId,
      post_id: postId,
    };

    try {
      await axios
        .put(`api/posts/${postId}/comments/${comment.id}`, updatedComment)
        .then((res) => {
          dispatch(editComment(res.data.modifications));
          console.log(res.data.modifications);
        });

      // setEditing(false);
    } catch (err) {
      console.error('Failed to save the comment', err);
    }
  };

  const onContentChanged = (e) => setContent(e.target.value);
  const canSave = [content, userId, postId].every(Boolean);

  return (
    <>
      {/* <TextField
        autoFocus
        margin="dense"
        id="content"
        label="Content"
        type="text"
        fullWidth
        defaultValue={comment.content}
        variant="standard"
        onChange={onContentChanged}
        // sx={{ minWidth: '500px' }}
      /> */}
      <form onSubmit={onEditCommentClick}>
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          defaultValue={comment.content}
          onChange={onContentChanged}
        />
        <input disabled={!canSave} type="submit" value="Confirm changes" />
      </form>
    </>
  );
};

export default EditCommentForm;
