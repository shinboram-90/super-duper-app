import { useEffect, useState, useCallback } from 'react';
import { addPost } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';

import useAuth from '../../hooks/useAuth';

export const AddPost = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const userId = auth.id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const formData = new FormData();

  if (image) {
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('content', content);
  } else {
    formData.append('title', title);
    formData.append('content', content);
  }

  // const createPost = async (formData) => {
  //   try {
  //     const response = await axios.post('api/posts', formData);
  //     return response.data.newPost;
  //   } catch (err) {
  //     return console.error(err);
  //   }
  // };

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  const onClickRemoveImage = () => {
    setImage('');
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img
          style={{ maxWidth: 400 }}
          src={URL.createObjectURL(image)}
          alt=""
          crossOrigin="true"
        />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  const canSave = [title, content].every(Boolean);

  const onSavePostClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const response = await axios.post('api/posts', formData);
      dispatch(addPost(response.data.newPost));
      setTitle('');
      setContent('');
      setImage('');
    }
  };

  return (
    <section>
      <h2>Add a new post</h2>
      <form onClick={onSavePostClicked}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          // placeholder="Posts's title"
          value={title}
          onChange={onTitleChanged}
        />

        <input
          type="file"
          id="image"
          name="image"
          onChange={onImageChanged}
          value={image}
        />
        <div>{imgPreview}</div>

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          // placeholder="Posts's Content"
          value={content}
          onChange={onContentChanged}
        />

        <button type="submit" disabled={!canSave}>
          Publish Post
        </button>
      </form>
    </section>
  );
};

export default AddPost;
