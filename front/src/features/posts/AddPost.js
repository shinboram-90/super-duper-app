import { useState } from 'react';
import { addPost } from './postsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

// MUI STYLES
import ListItemIcon from '@mui/material/ListItemIcon';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Stack, Tooltip, Card } from '@mui/material';

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
      <div
        style={{
          position: 'relative',
          width: 300,
          padding: '1rem 2rem',
        }}
      >
        <img
          style={{ width: '100%', borderRadius: '5px' }}
          src={URL.createObjectURL(image)}
          alt=""
          crossOrigin="true"
        />
        <Tooltip title="Remove">
          <ListItemIcon
            onClick={onClickRemoveImage}
            sx={{
              position: 'absolute',
              top: '1.2rem',
              left: '19rem',
              cursor: 'pointer',
            }}
          >
            <HighlightOffIcon fontSize="medium" />
          </ListItemIcon>
        </Tooltip>
      </div>
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
    <Card
      sx={{
        marginBottom: '4rem',
        backgroundColor: 'rgba(239, 239, 239, 0.5)',
        padding: '1.5rem',
        borderRadius: '5px',
        maxWidth: '42rem',
      }}
    >
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
            sx={{ marginBottom: '1rem' }}
          />

          <TextField
            type="text"
            id="content"
            label="Content"
            value={content}
            helperText="Post's content"
            onChange={onContentChanged}
            size="small"
            multiline
            rows={3}
            required
            fullWidth
          />
          <div>{imgPreview}</div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onImageChanged}
              />
              <Tooltip title="Add a picture">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
            </label>

            <Button disabled={!canSave} type="submit">
              Publish
            </Button>
          </Box>
        </form>
      </Stack>
    </Card>
  );
};

export default AddPost;
