import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useEffect } from 'react';
import AddPost from './AddPost';
import axios from '../../api/axios';
import { Navigate } from 'react-router-dom';

import { Container, Box } from '@mui/material';

const PostsList = () => {
  const { auth } = useAuth();
  // trigger actions
  const dispatch = useDispatch();

  // data stored in the store
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    axios
      .get('api/posts')
      .then((res) => dispatch(setPostsData(res.data.postList)));
  }, [dispatch]);

  const content = posts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  return (
    <Container>
      <Box sx={{ paddingLeft: '2rem' }}>
        <AddPost />
        {content}
      </Box>
    </Container>
  );
};
export default PostsList;
