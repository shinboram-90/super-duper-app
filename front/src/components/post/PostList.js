import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Outlet, Link, useNavigate } from 'react-router-dom';
// import ReadComments from './ReadComments';
import Navbar from '../Navbar';
import SinglePostPage from './SinglePostPage';
import AddPostForm from './AddPostForm';
// import EditPostForm from './EditPostForm';

const PostList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  // const [likes, setLikes] = useState();
  // const [comments, setComments] = useState([]);

  const addPost = async (newPostObject) => {
    // if (canSave) {
    newPostObject = {
      user_id: user.id,
      title: newPostObject.title,
      content: newPostObject.content,
    };
    newPostObject.append('file', newPostObject.image);
    try {
      const response = await axios.post('/api/posts', newPostObject);
      console.log(response.data.newPost);
      alert('New post successfully created');
      console.log(posts);
      // const addPost = [...posts].push(response.data.newPost);
      const newPost = [...posts];
      newPost.unshift({
        ...response.data.newPost,
      });
      setPosts(newPost);
      // navigate('/feed');
    } catch (err) {
      console.error(err);
      // }
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data.postList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // const likeHandler = (id) => {
  //   try {
  //     axios.post(`/posts/${id}/likes`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const editPost = async (id, postContent) => {
    try {
      const response = await axios.put(`/api/posts/${id}`, postContent);
      console.log(response.data);
      if (response) {
        const updatedPost = [...posts].filter((post) => post.id === id);
        setPosts(updatedPost);
      }

      // setPosts(response.data.postList);
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  // const addComment = async (id, comment) => {
  //   try{
  //     const newComment = {
  //       title,
  //       content,
  //       user_id: userId,
  //       image,
  //     };
  //     const response = axios.post(`/api/posts/${id}/comments`, comment)

  //   }catch(err){
  //     console.error(err)
  //   }
  // }

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      console.log(response.data);
      if (response) {
        const removePost = [...posts].filter((post) => post.id !== id);
        setPosts(removePost);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // const fetchComments = async (id) => {
  //   try {
  //     const response = await axios.get(`/api/posts/${id}/comments`);
  //     console.log(response.data);
  //     if (response) {
  //       setComments(response.data.commentList[0]);

  //       return comments.map((comment) => (
  //         <ReadComments key={comment.id} comment={comment} />
  //       ));
  //     }
  //   } catch (err) {
  //     console.error('Failed to login: ', err);
  //   }
  // };

  return (
    <>
      <Navbar />
      <section>
        <AddPostForm onAdd={addPost} />
        <Link to="/feed/new">Add a post</Link>
        <h2>Posts list</h2>
        <br />
        <p>All the gossip happening here.</p>
        <div style={{ display: 'flex' }}>
          <ul>
            {posts.map((post) => (
              <SinglePostPage
                key={'post' + post.id}
                post={post}
                onEdit={editPost}
                onDelete={deletePost}
              />
            ))}
          </ul>

          <hr />
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default PostList;
