import { deletePost } from './postsSlice';
import { useDispatch } from 'react-redux';

const DelPost = ({ postId }) => {
  const dispatch = useDispatch();
  const onDeletePostClicked = () => {
    try {
      dispatch(deletePost({ id: postId })).unwrap();
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };
  return (
    <div>
      {' '}
      <button
        className="deleteButton"
        type="button"
        onClick={onDeletePostClicked}
      >
        Delete Post
      </button>
    </div>
  );
};

export default DelPost;
