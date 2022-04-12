import { useState } from 'react';

import useAuth from '../../hooks/useAuth';

export const EditPostForm = ({ id, onEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);
  const [showForm, setShowForm] = useState(false);

  const toggle = () => {
    setShowForm(!showForm);
  };

  const { auth } = useAuth();
  const userId = auth.id;

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  // // const canSave = [title, content, userId, image].every(Boolean);

  // const onSavePostClicked = async () => {
  // if (canSave) {
  const updatedPost = {
    title,
    content,
    user_id: userId,
    image,
  };

  return (
    <section>
      <button onClick={toggle}>Edit</button>

      {showForm && (
        <>
          <form>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              placeholder="Posts's title"
              onChange={onTitleChanged}
            />
          </form>

          <input type="file" name="image" onChange={onImageChanged} />

          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            placeholder="Posts's Content"
            onChange={onContentChanged}
          />

          <button type="submit" onClick={() => onEdit(id, updatedPost)}>
            Publish Post
          </button>
        </>
      )}
    </section>
  );
};

export default EditPostForm;
