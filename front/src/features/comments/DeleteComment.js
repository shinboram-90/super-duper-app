import { deleteComment } from './commentsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

import { IconButton, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteComment = ({ postId, commentId }) => {
  const dispatch = useDispatch();

  const onDeleteCommentClicked = () => {
    try {
      axios
        .delete(`api/posts/${postId}/comments/${commentId}`)
        .then(() => dispatch(deleteComment(commentId)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };
  return (
    <Box>
      <Tooltip title="Delete">
        <IconButton onClick={onDeleteCommentClicked}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DeleteComment;
