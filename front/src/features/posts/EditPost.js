import { useState, useMemo } from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';

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

export const EditPost = ({ post, onEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const params = useParams();
  const id = params.postId;
  console.log(id);

  const { auth } = useAuth();
  const userId = auth.id;

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

  // function MyFormHelperText() {
  //   const { focused } = useFormControl() || {};

  //   const helperText = useMemo(() => {
  //     if (focused) {
  //       return 'This field is being focused';
  //     }

  //     return 'Helper text';
  //   }, [focused]);

  //   return <FormHelperText>{helperText}</FormHelperText>;
  // }

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
    post_id: id,
    image,
  };

  return (
    <section>
      {/* <form onSubmit={onEditPostClick}>
          <TextField
            type="text"
            id="title"
            label="Title"
            defaultValue={post.title}
            helperText="Edit title"
            onChange={onTitleChanged}
            size="small"
          />
          <label htmlFor="image">
            <Input
              ref={imageRef}
              accept="image/*"
              id="image"
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
          <TextField
            type="text"
            id="content"
            label="Content"
            defaultValue={post.content}
            helperText="Edit content"
            onChange={onContentChanged}
            size="small"
          />

          <Button disabled={!canSave} type="submit">
            Save changes
          </Button>
        </form> */}

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
              onChange={onTitleChanged}
            />
            {/* </DialogTitle> */}

            <div>
              <TextField
                autoFocus
                defaultValue={post.content}
                margin="dense"
                id="name"
                label="Content"
                type="text"
                fullWidth
                variant="standard"
                sx={{ minWidth: '500px' }}
                multiline
                rows={4}
                onChange={onContentChanged}
              />
            </div>
          </DialogContent>

          <DialogActions>
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
            <Button onClick={() => onEdit(id, updatedPost)} autoFocus>
              Edit post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default EditPost;
