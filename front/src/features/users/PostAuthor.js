import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../posts/postsSlice';
import PostsExcerpt from '../posts/PostsExcerpt';

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

  // const userPosts = useSelector((state) =>
  //   state.posts.posts.filter((post) => post.user_id === id)
  // );
  // console.log(posts);

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
                    <h4 style={{ margin: 0 }}>{user.username} details</h4>
                    <p>Email: {user.email}</p>

                    <span>
                      <p>
                        Name: {user.first_name} {user.last_name}
                      </p>
                      <p>Biography: {user.biography}</p>
                    </span>
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
