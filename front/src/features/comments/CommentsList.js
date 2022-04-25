import AddCommentForm from './AddCommentForm';
import CommentsExcerpt from './CommentsExcerpt';

const CommentsList = ({ comments, postId }) => {
  return (
    <aside>
      <AddCommentForm key={'addComment' + postId} postId={postId} />
      {comments.map((comment) => (
        <CommentsExcerpt
          key={'comment' + comment.id}
          comment={comment}
          postId={postId}
        />
      ))}
    </aside>
  );
};

export default CommentsList;
