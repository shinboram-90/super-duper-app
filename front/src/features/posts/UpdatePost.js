import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from './postsSlice';
import useAuth from '../../hooks/useAuth';

export const UpdatePost = ({ postId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((post) => post.id === postId);
  console.log(post);

  const formData = new FormData();

  if (image) {
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('content', content);
  } else {
    formData.append('title', title);
    formData.append('content', content);
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  const updatedPost = () => {
    dispatch(editPost(formData));
  };

  const [showForm, setShowForm] = useState(false);

  const toggle = () => {
    setShowForm(!showForm);
  };

  const onClickRemoveImage = () => {
    setImage(null);
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img style={{ maxWidth: 400 }} src={image} alt="" crossOrigin="true" />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  return (
    <section>
      <button onClick={toggle}>Edit</button>

      {showForm && (
        <>
          <form onClick={updatedPost}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={post.title}
              onChange={onTitleChanged}
            />

            <input type="file" name="image" onChange={onImageChanged} />
            <img
              style={{ maxWidth: 400 }}
              src={post.image}
              alt=""
              crossOrigin="true"
            />
            <div>{imgPreview}</div>

            <label htmlFor="postContent">Content:</label>
            <textarea
              id="postContent"
              name="postContent"
              value={post.content}
              onChange={onContentChanged}
            />

            <button type="submit">Confirm changes</button>
          </form>
        </>
      )}
    </section>
  );
};

export default UpdatePost;
