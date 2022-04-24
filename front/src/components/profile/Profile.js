import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Box } from '@mui/system';
import { setPostsData } from '../../features/posts/postsSlice';
import PostsExcerpt from '../../features/posts/PostsExcerpt';
import { setUserData } from '../../features/users/usersSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();

  // const posts = useSelector((state) => state.posts.posts);
  // const myPosts = posts.filter((post) => post.user_id === auth.id);
  const user = useSelector((state) => state.users.user);

  const myPosts = useSelector((state) =>
    state.posts.posts.filter((post) => post.user_id === auth.id)
  );
  // const user = useSelector((state) =>
  //   state.users.users.find((user) => user.id === auth.id)
  // );
  console.log(user);

  useEffect(() => {
    axios
      .get(`api/users/${auth.id}`)
      .then((res) => dispatch(setUserData(res.data.user)));
  }, [dispatch, auth.id]);

  useEffect(() => {
    axios
      .get(`api/profile/${auth.id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, auth.id]);

  const content = myPosts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  // if (!auth) {
  //   return <Navigate replace to="/login" />;
  // }
  // console.log(auth);
  return (
    <Box>
      <Outlet />
      <h3>My Profile</h3>
      <img
        alt="user avatar"
        src={user.avatar}
        crossOrigin="true"
        style={{ maxWidth: 200 }}
      />
      <p>Username: {user.username}</p>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Biography: {user.biography}</p>

      {content}
    </Box>
  );
};

export default Profile;
