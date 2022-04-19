import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  fetchPosts,
  getPostsStatus,
  getPostsError,
} from './postsSlice';
import PostsExcerpt from './PostExcerpt';
import { useEffect } from 'react';
import AddPost from './AddPost';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => (
      <PostsExcerpt key={`posts:${post.id}`} postId={post.id} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <AddPost />
      {content}
    </section>
  );
};
export default PostsList;
