import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Box } from '@mui/system';
import { setPostsData } from '../../features/posts/postsSlice';
import PostsExcerpt from '../../features/posts/PostsExcerpt';
import { setUsersData } from '../../features/users/usersSlice';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useAuth();

  // const posts = useSelector((state) => state.posts.posts);
  // const myPosts = posts.filter((post) => post.user_id === auth.id);
  // const users = useSelector((state) => state.users.users);
  // const user = useSelector((state) =>
  //   state.users.users.filter((user) => user.id === auth.id)
  // );

  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === auth.id);
  // console.log(userDeux);

  const myPosts = useSelector((state) =>
    state.posts.posts.filter((post) => post.user_id === auth.id)
  );

  useEffect(() => {
    axios
      .get(`api/users/`)
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch, auth.id]);

  useEffect(() => {
    axios
      .get(`api/posts`)
      .then((res) => dispatch(setPostsData(res.data.postList)));
  }, [dispatch, auth.id]);

  const content = myPosts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  return (
    <Box>
      <Outlet />
      <h3>My Profile</h3>
      {user ? (
        <div>
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
        </div>
      ) : (
        <div>"loading"</div>
      )}

      {content}
    </Box>
  );
};

export default Profile;
