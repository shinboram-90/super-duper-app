import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import DeletePost from './DeletePost';
import AddPostForm from './AddPostForm';
import EditPostForm from './EditPostForm';
import Comments from '../comment/Comments';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import CommentIcon from '@mui/icons-material/Comment';

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

const SinglePostPage = ({ post, onDelete, onEdit }) => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  // const [showComments, setShowComments] = useState(false);
  const [flag, setFlag] = useState(false);

  const { auth } = useAuth();
  const userId = auth.id;
  const postId = post.id;
  const image = post.image;

  // const toggle = () => {
  //   setShowComments(!showComments);
  // };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/api/posts/${postId}/comments`);

      if (response.data.commentList !== undefined) {
        setComments(response.data.commentList);
      }
    } catch (err) {
      console.error('Failed to fetch comments: ', err);
    }
  };

  const fetchLikes = async (postId) => {
    try {
      const response = await axios.get(`/api/posts/${postId}/likes`);

      if (response.status === 200) {
        setLikes(response.data.totalLikes[0].total);
      }
    } catch (err) {
      console.error('Failed to fetch likes: ', err);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${postId}/likes`, {
        user_id: userId,
        post_id: postId,
        is_liked: isLiked,
      });

      if (response.status === 200) {
        console.log(response);
        setLikes(
          isLiked ? (prevLikes) => prevLikes - 1 : (prevLikes) => prevLikes + 1
        );
        setFlag((prevFlag) => !prevFlag);
        const hey = localStorage.setItem('heart', flag);
        console.log(flag);
        console.log(hey);
      }
    } catch (err) {
      console.error('Failed to give likes: ', err);
    }
  };

  useEffect(() => {
    fetchLikes(postId);
    console.log(localStorage.getItem('heart'));
  }, [postId, userId, likes, isLiked, flag]);

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

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
  };

  return (
    <>
      {/* <section>
        <h1>Post Page</h1>
        <br />
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="flexGrow"></div>
        {image !== null ? (
          <img alt={post.title} src={image} crossOrigin="true" />
        ) : (
          ''
        )}

        {likes ? (
          <button onClick={handleLike}>{likes} likes</button>
        ) : (
          <button onClick={handleLike}>0 likes</button>
        )}

        <EditPostForm id={post.id} onEdit={onEdit} />
        <DeletePost id={post.id} onDelete={onDelete} />
        <button onClick={toggle}>{post.comments}</button>
        {showComments && (
          <Comments id={postId} comments={comments} post={post} />
        )}
        <hr />
      </section> */}

      <Card sx={{ maxWidth: 700, margin: '2rem auto', alignItems: 'center' }}>
        <CardHeader
          avatar={
            <>
              <Avatar
                sx={{
                  bgcolor: red[100],
                }}
              >
                {auth.avatar}
              </Avatar>
              <MenuItem>{auth.username}</MenuItem>
            </>
          }
          action={
            <IconButton aria-label="settings">
              <div>
                <div
                  aria-label="more"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </div>

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
                  <MenuItem>
                    <ListItemIcon onClick={handleClose}>
                      <SendIcon fontSize="small" />
                    </ListItemIcon>

                    <EditPostForm post={post} onEdit={onEdit} />
                    {/* Edit */}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PriorityHighIcon fontSize="small" />
                    </ListItemIcon>{' '}
                    <DeletePost id={post.id} onDelete={onDelete} />
                  </MenuItem>
                </Menu>
              </div>
            </IconButton>
          }
          title={post.title}
          subheader={post.created_at}
        />
        {image !== null ? (
          <CardMedia
            component="img"
            height="350"
            alt={post.title}
            src={image}
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

        <CardActions
          disableSpacing
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteIcon color={flag ? 'warning' : ''} />
            </IconButton>
            {likes === 1 ? (
              <span>{likes} like</span>
            ) : likes > 1 ? (
              <span>{likes} likes</span>
            ) : (
              <span>0 like</span>
            )}
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
          </div>
          <div>
            <span
              onClick={() => {
                setExpanded(!expanded);
              }}
              sx={{
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'transparent' },
              }}
            >
              <Badge color="secondary" badgeContent={post.comments} showZero>
                <CommentIcon />
              </Badge>
            </span>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <Divider variant="inset" component="li" />
              <ListItem>
                {/* <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <Comments id={postId} comments={comments} post={post} />
                {/* <ListItemText primary="Vacation" secondary="July 20, 2014" /> */}
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
export default SinglePostPage;
