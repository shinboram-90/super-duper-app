import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../posts/postsSlice';
// import PostsExcerpt from '../posts/PostsExcerpt';

const PostAuthor = () => {
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch;

  const [user, setUser] = useState([]);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(`api/users/${id}`)
        .then((response) => {
          setUser(response.data.user[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, [id]);

  // const userPosts = useSelector((state) =>
  //   state.posts.posts.filter((post) => post.user_id === id)
  // );
  console.log(posts);

  useEffect(() => {
    axios
      .get(`api/profile/${id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, id]);

  // const content = userPosts.map((post) => (
  //   <PostsExcerpt key={`userPosts:${post.id}`} post={post} />
  // ));
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <UsersList /> */}
          <h2>User profile: {id}</h2>
          <img src={`${user.avatar}`} alt="avatar" crossOrigin="true" />
          <p>
            {user.id} {user.role}
          </p>
          <p>
            Email: {user.email}
            <br />
            Bio : {user.biography}
          </p>
        </Box>
        {/* {userPosts.map((post) => (
          <li key={`userPosts:${post.id}`} post={post}>
            {post.title}
          </li>
        ))} */}
      </Container>
    </>
  );
};

export default PostAuthor;
