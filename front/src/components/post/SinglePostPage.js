import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DeletePost from './DeletePost';
import AddPostForm from './AddPostForm';
import EditPostForm from './EditPostForm';
import Comments from '../comment/Comments';

const SinglePostPage = ({ post, onDelete, onEdit }) => {
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);
  const postId = post.id;
  const image = post.image;

  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const [showComments, setShowComments] = useState(false);

  const toggle = () => {
    setShowComments(!showComments);
  };

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

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  return (
    <section>
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

      <EditPostForm id={post.id} onEdit={onEdit} />
      <DeletePost id={post.id} onDelete={onDelete} />
      <button onClick={toggle}>{post.comments}</button>
      {showComments && <Comments id={postId} comments={comments} post={post} />}
      <hr />
    </section>
  );
};
export default SinglePostPage;
