import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export const AddPostForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  // const [file, setFile] = useState();
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);

  // const { auth } = useAuth();
  // const userId = auth.id;

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  // // const canSave = [title, content, userId, image].every(Boolean);

  // const onSavePostClicked = async () => {
  // if (canSave) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('content', content);
  } else {
    formData.append('title', title);
    formData.append('content', content);
  }

  return (
    <section>
      <h2>Say something</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
        />

        <input type="file" id="image" name="image" onChange={onImageChanged} />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          onChange={onContentChanged}
        />
      </form>

      <button type="submit" onClick={() => onAdd(formData)}>
        Publish Post
      </button>
    </section>
  );
};

export default AddPostForm;
