import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Box } from '@mui/system';
import { setPostsData } from '../../features/posts/postsSlice';
import PostExcerpt from '../../features/posts/PostExcerpt';

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();

  const posts = useSelector((state) => state.posts.posts);

  console.log(posts);

  const [profile, setProfile] = useState();

  const handleClick = async () => {
    const response = await axios.put(`/api/users/${auth.id}`);
    // console.log(response.data.currentUser[0]);
    setProfile(response.data);
  };

  useEffect(() => {
    axios
      .get(`api/profile/${auth.id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, auth.id]);

  const content = posts.map((post) => (
    <PostExcerpt key={`posts:${post.id}`} post={post} />
  ));

  // if (!auth) {
  //   return <Navigate replace to="/login" />;
  // }
  // console.log(auth);
  return (
    <Box>
      <h3>My Profile</h3>
      <p>username: {auth.username}</p>
      <p>email: {auth.email}</p>

      <img alt="user avatar" src={auth.avatar} crossOrigin="true" />
      <button onClick={handleClick}>Edit Profile</button>
      {content}
    </Box>
  );
};

export default Profile;
