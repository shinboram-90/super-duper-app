import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import DeleteComment from './DeleteComment';
import axios from '../../api/axios';

import { useDispatch, useSelector } from 'react-redux';
import { setCommentsData } from './commentsSlice';

import CommentsExcerpt from './CommentsExcerpt';

const CommentsList = ({ comments, postId }) => {
  // console.log(comments.first);

  // const commentsArray = Object.keys(comments).map(function (key) {
  //   return comments[key];
  // });

  // const comment = commentsArray.filter((x) => x.id === filmId);
  // const dispatch = useDispatch();

  // const comments = useSelector((state) => state.comments.comments);

  // useEffect(() => {
  //   axios
  //     .get(`api/posts/${postId}/comments`)
  //     .then((res) => dispatch(setCommentsData(res.data.commentList)));
  // }, [dispatch, postId]);

  return (
    <aside style={{ background: 'red' }}>
      FUUUUUUUCK
      {/* <AddCommentForm postId={postId} style={{ margin: 500 }} /> */}
      {comments
        ? comments.map((comment) => (
            <ul key={comment.id}>
              <li>
                {console.log(comment.content)}
                <p>content: {comment.content}</p>
                <div>author: {comment.username}</div>
                <div>author: {comment.created_at}</div>
              </li>

              <EditCommentForm
                key={'edit' + comment.id}
                id={comment.id}
                postId={postId}
                comment={comment}
              />

              <DeleteComment
                key={'delete' + comment.id}
                commentId={comment.id}
                postId={postId}
              />
            </ul>
          ))
        : 'Nothing to display'}
    </aside>
  );
};

export default CommentsList;
