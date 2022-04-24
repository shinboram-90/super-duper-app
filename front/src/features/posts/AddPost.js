import { useState } from 'react';
import { addPost } from './postsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

// MUI STYLES
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

export const AddPost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const Input = styled('input')({
    display: 'none',
  });

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

  const onClickRemoveImage = () => {
    setImage(null);
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
      try {
        await axios.post('api/posts', formData).then((res) => {
          dispatch(addPost(res.data.newPost));
        });

        setTitle('');
        setContent('');
        setImage(null);
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  return (
    <section>
      <h2>Write a new post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
          value={title}
        />
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={onImageChanged}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {/* <input type="file" id="image" name="image" onChange={onImageChanged} /> */}
        <div>{imgPreview}</div>

        <label htmlFor="postContent">Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          onChange={onContentChanged}
          value={content}
        />

        <input type="submit" disabled={!canSave} value="Publish Post" />
      </form>
    </section>
  );
};

export default AddPost;
