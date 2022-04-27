import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { setPostsData } from '../../features/posts/postsSlice';
import PostsExcerpt from '../../features/posts/PostsExcerpt';

import moment from 'moment-timezone';
import { Container, Box, Card, Avatar } from '@mui/material';
import random2 from '../../assets/random2.png';
import random20 from '../../assets/random20.jpg';

const Profile = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const myPosts = useSelector((state) => state.posts.posts);

  const user = auth;

  useEffect(() => {
    axios
      .get(`api/profile/${auth.id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, auth.id]);

  const content = myPosts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  return (
    <Container>
      <Box>
        <Card
          className="profile__card--img"
          sx={{
            display: 'flex',

            maxWidth: '45rem',
            marginBottom: '5rem',
            paddingBottom: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              paddingTop: '2rem',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <h3 style={{ textAlign: 'center' }}>{user.username}</h3>

            {user ? (
              <div>
                <Avatar sx={{ width: 150, height: 150, margin: '0 auto' }}>
                  {user.role === 'user' ? (
                    <img
                      alt="Random user avatar"
                      src={random2}
                      crossOrigin="true"
                      style={{ maxWidth: 150 }}
                    />
                  ) : (
                    <img
                      alt="Random admin avatar"
                      height="150"
                      src={random20}
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
                  <h4 style={{ margin: 0 }}>{user.username} details</h4>
                  <p>Email: {user.email}</p>

                  <p>
                    Member since:{' '}
                    {moment(user.created_at).format('MMMM Do YYYY')}
                  </p>
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
