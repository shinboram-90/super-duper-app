import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useEffect, useState } from 'react';
import AddPost from './AddPost';
import axios from '../../api/axios';

import { Container, Box, CircularProgress } from '@mui/material';

const PostsList = () => {
  const [loading, setLoading] = useState(true);
  // trigger actions
  const dispatch = useDispatch();

  // data stored in the store
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    axios
      .get('api/posts')
      .then((res) => dispatch(setPostsData(res.data.postList)));
  }, [dispatch]);

  const content = posts.map((post) => (
    <PostsExcerpt key={`posts:${post.id}`} post={post} />
  ));

  return (
    <Container>
      <Box>
        <AddPost />
        {!loading ? (
          <Box>{content}</Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default PostsList;
