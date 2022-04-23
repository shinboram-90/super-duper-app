import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import DeleteComment from './DeleteComment';
import axios from '../../api/axios';

import { useDispatch, useSelector } from 'react-redux';
import { setCommentsData } from './commentsSlice';

import CommentsExcerpt from './CommentsExcerpt';

const CommentsList = ({ postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  // const ordered = comments.filter((comment) => comment.post_id === postId);
  // console.log(ordered);

  useEffect(() => {
    axios
      .get(`api/posts/${postId}/comments`)
      .then((res) => dispatch(setCommentsData(res.data.commentList)));
  }, [dispatch, postId]);

  return (
    <aside>
      <AddCommentForm postId={postId} style={{ margin: 500 }} />
      {comments
        ? comments.map((comment) => (
            <ul key={'comments' + comment.id}>
              <li>
                <p>content: {comment.content}</p>
                <div>author: {comment.username}</div>
                <div>author: {comment.created_at}</div>
                {/* <p>{console.log(comment.content)}</p> */}
              </li>

              {/* <button type="submit">Edit Comment</button> */}
              <EditCommentForm
                key={'edit' + comment.id}
                id={comment.id}
                postId={postId}
                comment={comment}
              />
              {/* <button type="submit">Delete Comment</button> */}
              <DeleteComment
                key={'delete' + comment.id}
                id={comment.id}
                postId={postId}
              />
            </ul>
          ))
        : 'No comments to display'}
      <Outlet />
    </aside>
  );
};

export default CommentsList;
