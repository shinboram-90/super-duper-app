import { useState } from 'react';
import { addPost } from './postsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

// MUI STYLES
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Stack } from '@mui/material';

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
    <Box sx={{ width: '100%', marginBottom: '4rem' }}>
      <Stack spacing={3}>
        <h2>Write a new post</h2>
        <form onSubmit={onSavePostClicked}>
          <TextField
            type="text"
            id="title"
            label="Title"
            value={title}
            helperText="Post's title"
            onChange={onTitleChanged}
            size="small"
            required
            fullWidth
          />

          <TextField
            type="text"
            id="content"
            label="Content"
            value={content}
            helperText="Post's content"
            onChange={onContentChanged}
            size="small"
            required
            fullWidth
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
          <div>{imgPreview}</div>
          <Button disabled={!canSave} type="submit">
            Publish
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default AddPost;
