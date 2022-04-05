import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DeletePost from './DeletePost';
import AddPostForm from './AddPostForm';

const SinglePostPage = ({ post, onDelete, onEdit }) => {
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);
  // const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  // const deletePost = async () => {
  //   try {
  //     const response = await axios.delete(`/api/posts/${post.id}`);
  //     setPosts();
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchPost = () => {
  //     axios
  //       .get(`api/posts/${id}`)
  //       .then((response) => {
  //         console.log(response);
  //         console.log(response.data.post[0]);
  //         setPost(response.data.post[0]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchPost();
  // }, [id]);

  return (
    <section>
      <h1>Post Page</h1>
      <br />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <DeletePost id={post.id} onDelete={onDelete} />
      <hr />
    </section>
  );
};
export default SinglePostPage;
