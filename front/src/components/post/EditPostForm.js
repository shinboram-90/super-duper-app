import { useState, useMemo } from 'react';
import useAuth from '../../hooks/useAuth';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const ariaLabel = { 'aria-label': 'description' };

export const EditPostForm = ({ post, onEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const { auth } = useAuth();
  const userId = auth.id;
  // const [showForm, setShowForm] = useState(false);

  // const toggle = () => {
  //   setShowForm(!showForm);
  // };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (focused) {
        return 'This field is being focused';
      }

      return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  const Input = styled('input')({
    display: 'none',
  });

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
      {/* <button onClick={toggle}>Edit</button> */}

      {/* {showForm && (
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
            Edit Post
          </button>
        </>
      )} */}

      <div>
        <div
          style={{ position: 'relative' }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Edit
          <span className="edit__helper--click"></span>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive"
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              defaultValue={post.title}
              variant="standard"
              sx={{ minWidth: '500px' }}
            />
            {/* </DialogTitle> */}

            <div>
              <TextField
                autoFocus
                defaultValue={post.content}
                margin="dense"
                id="name"
                label="Content"
                type="email"
                fullWidth
                variant="standard"
                sx={{ minWidth: '500px' }}
                multiline
                rows={4}
              />
            </div>
          </DialogContent>

          <DialogActions>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Button onClick={handleClose} autoFocus>
              Edit post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default EditPostForm;
