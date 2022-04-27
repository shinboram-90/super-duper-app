import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../posts/postsSlice';
import PostsExcerpt from '../posts/PostsExcerpt';
import random2 from '../../assets/random2.png';
import random20 from '../../assets/random20.jpg';
import moment from 'moment-timezone';
import { Container, Box, Card, Avatar } from '@mui/material';

const PostAuthor = () => {
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();

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

  useEffect(() => {
    axios
      .get(`api/profile/${id}`)
      .then((res) => dispatch(setPostsData(res.data.myPosts)));
  }, [dispatch, id]);

  const content = posts.map((post) => (
    <PostsExcerpt key={`userPosts:${post.id}`} post={post} />
  ));
  return (
    <>
      <Container>
        <Box sx={{ paddingLeft: '2rem' }}>
          <Card
            className="profile__card--img"
            sx={{
              display: 'flex',

              maxWidth: '45rem',
              marginBottom: '5rem',
              paddingBottom: '1.5rem',
            }}
          >
            <Box sx={{ margin: '0 auto', paddingTop: '2rem' }}>
              <h3 style={{ textAlign: 'center' }}>{user.username}</h3>

              {user ? (
                <div style={{ width: 500 }}>
                  <Avatar sx={{ width: 150, height: 150, margin: '0 auto' }}>
                    {user.role === user ? (
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
          <h3>{user.username} publications</h3>
          {content}
        </Box>
      </Container>
    </>
  );
};

export default PostAuthor;
