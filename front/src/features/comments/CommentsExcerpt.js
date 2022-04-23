import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import DeleteComment from './DeleteComment';
import EditCommentForm from './EditCommentForm';

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
    <div style={{ backgroundColor: 'red' }}>
      {editing ? (
        <div>
          <EditCommentForm
            key={'edit' + comment.id}
            comment={comment}
            postId={postId}
          />
        </div>
      ) : (
        <div>
          <h3>{comment.content}</h3>
          <p>{comment.username}</p>
        </div>
      )}

      <button type="button" onClick={() => setEditing(!editing)}>
        Edit Comment
      </button>
      <DeleteComment
        key={'delete' + comment.id}
        postId={postId}
        commentId={comment.id}
      />
    </div>
  );
};

export default CommentsExcerpt;
