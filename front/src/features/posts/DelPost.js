import { deletePost } from './postsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

const DelPost = ({ postId }) => {
  const dispatch = useDispatch();

  const onDeletePostClicked = () => {
    try {
      axios
        .delete(`api/posts/${postId}`)
        .then(() => dispatch(deletePost(postId)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  return (
    // <span className="deleteButton" type="button" onClick={onDeletePostClicked}>
    //   Delete
    // </span>
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      className="delete_button"
      type="button"
      onClick={onDeletePostClicked}
    >
      Delete
      <span className="delete__helper--click"></span>
    </div>
  );
};

export default DelPost;
