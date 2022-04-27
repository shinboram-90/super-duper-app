import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { addComment } from './commentsSlice';

import { TextField, Button, Box } from '@mui/material';

export const AddCommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const { auth } = useAuth();
  const userId = auth.id;

  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [content, userId, postId].every(Boolean);

  const onSaveCommentClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      setContent('');
      try {
        await axios
          .post(`api/posts/${postId}/comments`, formData)
          .then((res) => {
            dispatch(addComment(res.data.newcomment));
          });
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  const formData = {
    content: content,
    post_id: postId,
    user_id: userId,
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(239, 239, 239, 0.5)',
        padding: '1.3rem 1rem 0.5rem 1rem',
        borderRadius: '5px',
      }}
    >
      <form onClick={onSaveCommentClicked}>
        <TextField
          type="text"
          id="content"
          label="Say something..."
          value={content}
          onChange={onContentChanged}
          size="small"
          multiline
          rows={2}
          required
          fullWidth
          helperText="Write a comment"
        />
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button disabled={!canSave} type="submit">
            Publish
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddCommentForm;
