import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from '../../context/AuthContext';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // const { user } = useContext(AuthContext);

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

  const editPost = () => {
    console.log('to edit');
  };

  const fetchComments = () => {
    console.log('comments');
  };

  return (
    <>
      <Navbar />
      <section>
        <h2>Posts list</h2>
        <br />
        <p>All the gossip happening here.</p>
        <div style={{ display: 'flex' }}>
          <nav
            style={{
              padding: '1rem',
            }}
          ></nav>

          <ul>
            {posts.map(
              ({
                title,
                id,
                content,
                created_at,
                updated_at,
                status,
                comments,
                username,
              }) => (
                <li key={id}>
                  {/* <Link to={`posts/${id}`}>{title}</Link> */}
                  <h1>{title}</h1>
                  <p>{content}</p>
                  <span>{created_at}</span>
                  <br />
                  <span>{updated_at}</span>
                  <br />
                  <span>
                    <small>{status}</small>
                  </span>
                  <p>likes:</p>
                  <p>Author: {username}</p>

                  <Link to={`/edit/${id}`}>Add a post</Link>

                  <button
                    onClick={() => {
                      editPost(id);
                    }}
                  >
                    Edit
                  </button>
                  {comments ? (
                    <button
                      onClick={() => {
                        fetchComments(id);
                      }}
                    >
                      <p>Number of comments: {comments}</p>
                    </button>
                  ) : (
                    ''
                  )}
                </li>
              )
            )}
          </ul>

          <hr />
        </div>
      </section>
    </>
  );
};

export default Feed;
