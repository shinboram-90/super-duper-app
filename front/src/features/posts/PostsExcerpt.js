import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from './postsSlice';
import axios from '../../api/axios';
import DelPost from './DelPost';
import CommentsList from '../comments/CommentsList';
import { setCommentsData } from '../comments/commentsSlice';
import moment from 'moment-timezone';

// MUI STYLES
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { TextField, Button, Stack, Box } from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';

import ShareIcon from '@mui/icons-material/Share';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const ITEM_HEIGHT = 48;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostsExcerpt = ({ post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const imageRef = useRef(null);
  const [image, setImage] = useState(post.image);
  const Input = styled('input')({
    display: 'none',
  });

  const canSave = [title, content].every(Boolean);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);
  const [editing, setEditing] = useState(false);

  const onClickRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img
          style={{ maxWidth: 200 }}
          src={imageRef.current?.value ? URL.createObjectURL(image) : image}
          alt=""
          crossOrigin="true"
        />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  // const time = post.created_at;
  // const timeConverted = moment
  //   .tz(time, 'Europe/Paris')
  //   .format('dddd, MMMM Do YYYY, h:mm a');

  const onEditPostClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', imageRef.current.value);
    }
    formData.append('title', title);
    formData.append('content', content);

    try {
      await axios.put(`api/posts/${post.id}`, formData).then((res) => {
        dispatch(editPost([post.id, res.data.modifications]));
      });

      setEditing(false);
    } catch (err) {
      console.error('Failed to save the post', err);
    }
  };

  const comments = useSelector((state) => state.comments.comments);
  const neededComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

  const toggleComments = () => {
    try {
      axios
        .get(`api/posts/${post.id}/comments`)
        .then((res) => dispatch(setCommentsData(res.data.commentList)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  //MUI STYLES
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    try {
      axios
        .get(`api/posts/${post.id}/comments`)
        .then((res) => dispatch(setCommentsData(res.data.commentList)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  return (
    <article className="post-excerpt" key={post.id}>
      {editing ? (
        <form onSubmit={onEditPostClick}>
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
        </form>
      ) : (
        <Card sx={{ maxWidth: 900, marginBottom: '5rem' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {post.username.charAt(0)}
              </Avatar>
            }
            action={
              <Box aria-label="settings">
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon onClick={() => setEditing(!editing)}>
                        <SendIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PriorityHighIcon fontSize="small" />
                      </ListItemIcon>
                      <DelPost postId={post.id} />
                    </MenuItem>
                  </Menu>
                </div>
              </Box>
            }
            title={post.title}
            subheader={moment(post.created_at).format('dddd, MMMM Do YYYY')}
          />

          {post.image ? (
            <CardMedia
              component="img"
              height="300"
              alt={post.title}
              image={post.image}
              crossOrigin="true"
            />
          ) : (
            ''
          )}

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Comments:</Typography>
              <CommentsList comments={neededComments} postId={post.id} />
            </CardContent>
          </Collapse>
        </Card>
      )}
    </article>
  );
};

export default PostsExcerpt;
