import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { addComment } from './commentsSlice';

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
      try {
        await axios
          .post(`api/posts/${postId}/comments`, formData)
          .then((res) => {
            dispatch(addComment(res.data.newcomment));
          });

        setContent('');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };
  // const onSavecommentClicked = async () => {
  // if (canSave) {
  const formData = {
    content: content,
    post_id: postId,
    user_id: userId,
  };

  return (
    <section style={{ background: 'blue' }}>
      <h2>Add a new comment</h2>
      <form onClick={onSaveCommentClicked}>
        <label htmlFor="commentContent">Content:</label>
        <textarea
          id="commentContent"
          name="commentContent"
          placeholder="comments's Content"
          onChange={onContentChanged}
        />

        <input type="submit" disabled={!canSave} value="Add comment" />
      </form>
    </section>
  );
};

export default AddCommentForm;
