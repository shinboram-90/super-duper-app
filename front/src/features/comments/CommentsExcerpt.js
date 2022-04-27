import DeleteComment from './DeleteComment';
import moment from 'moment-timezone';
import useAuth from '../../hooks/useAuth';

// MUI STYLES
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const CommentsExcerpt = ({ postId, comment }) => {
  const { auth } = useAuth();

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
          {comment.user_id === auth.id || auth.role === 'admin' ? (
            <DeleteComment
              key={'delete' + comment.id}
              postId={postId}
              commentId={comment.id}
            />
          ) : (
            ''
          )}
        </Box>
        <Divider component="li" />
      </List>
    </div>
  );
};

export default CommentsExcerpt;
