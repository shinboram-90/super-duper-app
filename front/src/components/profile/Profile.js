import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { setPostsData } from '../../features/posts/postsSlice';
import PostsExcerpt from '../../features/posts/PostsExcerpt';
import { setUsersData } from '../../features/users/usersSlice';
import {
  Container,
  Box,
  Card,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

const Profile = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToProfileEdit = () => {
    navigate('edit');
  };

  const myPosts = useSelector((state) => state.posts.posts);
  // const myPosts = posts.filter((post) => post.user_id === auth.id);
  // const users = useSelector((state) => state.users.users);
  // const user = useSelector((state) =>
  //   state.users.users.filter((user) => user.id === auth.id)
  // );

  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.id === auth.id);

  useEffect(() => {
    axios
      .get(`api/profile/${auth.id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, auth.id]);

  useEffect(() => {
    axios
      .get(`api/users/`)
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch, auth.id]);

  const content = myPosts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  return (
    <Container>
      <Box sx={{ paddingLeft: '2rem' }}>
        <Card
          className="profile__card--img"
          sx={{
            display: 'flex',
            height: 450,
            maxWidth: '45rem',
            marginBottom: '5rem',
          }}
        >
          <Box sx={{ margin: '0 auto', paddingTop: '2rem' }}>
            <h3 style={{ textAlign: 'center' }}>{auth.username}</h3>

            {user ? (
              <div style={{ width: 500 }}>
                <Avatar sx={{ width: 150, height: 150, margin: '0 auto' }}>
                  {user.avatar ? (
                    <img
                      alt="user avatar"
                      src={user.avatar}
                      crossOrigin="true"
                      style={{ maxWidth: 150 }}
                    />
                  ) : (
                    <img
                      alt="avatar"
                      height="150"
                      src={defaultAvatar}
                      crossOrigin="true"
                    />
                  )}
                </Avatar>
                <Box
                  sx={{
                    marginTop: '2rem',
                    backgroundColor: 'rgba(239, 239, 239, 0.2)',
                    padding: '1rem 3rem',
                  }}
                >
                  <h4 style={{ margin: 0 }}>My details</h4>
                  <p>Email: {user.email}</p>
                  {user.first_name && user.last_name && user.biography ? (
                    <span>
                      <p>
                        Name: {user.first_name} {user.last_name}
                      </p>
                      <p>Biography: {user.biography}</p>
                    </span>
                  ) : (
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption">
                        Your profile seems to be incomplete, please click the
                        button below to add the missing information.
                      </Typography>
                      <span style={{ textAlign: 'center' }}>
                        <IconButton
                          color="primary"
                          onClick={goToProfileEdit}
                          aria-label="edit profile"
                          size="large"
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </span>
                    </span>
                  )}
                </Box>
              </div>
            ) : (
              <div>"loading"</div>
            )}
          </Box>
        </Card>
        <h3>My publications</h3>
        {content}
      </Box>
    </Container>
  );
};

export default Profile;
