import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

export const AddPostForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);

  const { user } = useContext(AuthContext);
  const userId = user.user[0].id;

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  // // const canSave = [title, content, userId, image].every(Boolean);

  // const onSavePostClicked = async () => {
  // if (canSave) {
  const newPost = {
    title,
    content,
    user_id: userId,
    image,
  };

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
        />

        <input type="file" name="image" onChange={onImageChanged} />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          onChange={onContentChanged}
        />
      </form>

      <button type="submit" onClick={() => onAdd(newPost)}>
        Publish Post
      </button>
    </section>
  );
};

export default AddPostForm;
