import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DeleteComment from './DeleteComment';
import moment from 'moment-timezone';

// MUI STYLES
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const CommentsExcerpt = ({ postId, comment }) => {
  const [content, setContent] = useState(comment.content);
  const [editing, setEditing] = useState(false);

  const { auth } = useAuth();
  const userId = auth.id;

  // console.log(comment);

  // const onContentChanged = (e) => setContent(e.target.value);

  // const updatedComment = {
  //   content: content,
  //   user_id: userId,
  //   post_id: postId,
  // };
  return (
    <div>
      <List>
        <li>
          <Typography
            sx={{ mt: 0.5, ml: 4 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            {moment(comment.created_at).format('dddd, MMMM Do YYYY')}
          </Typography>
        </li>
        <Box
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {comment && comment.username ? comment.username.charAt(0) : ''}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={comment.username}
              primary={comment.content}
            />
          </ListItem>
          <DeleteComment
            key={'delete' + comment.id}
            postId={postId}
            commentId={comment.id}
          />
        </Box>
        <Divider component="li" />
      </List>
    </div>
  );
};

export default CommentsExcerpt;
