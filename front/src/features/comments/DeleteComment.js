import { deleteComment } from './commentsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

const DeleteComment = ({ postId, commentId }) => {
  const dispatch = useDispatch();

  const onDeleteCommentClicked = () => {
    try {
      axios
        .delete(`api/posts/${postId}/comments/${commentId}`)
        .then(() => dispatch(deleteComment(postId)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };
  return (
    <button
      style={{ position: 'relative', cursor: 'pointer' }}
      className="delete_button"
      onClick={onDeleteCommentClicked}
    >
      Delete
      {/* <span className="delete__helper--click"></span> */}
    </button>
  );
};

export default DeleteComment;
