// import { useDispatch, useSelector } from 'react-redux';
// import { setPostsData } from './postsSlice';
// import PostsExcerpt from './PostExcerpt';
// import { useEffect } from 'react';
// import AddPost from './AddPost';
// import axios from '../../api/axios';

// const PostsList = () => {
//   // trigger actions
//   const dispatch = useDispatch();

//   // data stored in the store
//   const posts = useSelector((state) => state.posts.posts);

//   useEffect(() => {
//     axios
//       .get('api/posts')
//       .then((res) => dispatch(setPostsData(res.data.postList)));
//   }, [dispatch]);

//   const content = posts.map((post) => (
//     <PostsExcerpt key={`posts:${post.id}`} post={post} />
//   ));

//   return (
//     <section>
//       <AddPost />
//       {content}
//     </section>
//   );
// };
// export default PostsList;

import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from './postsSlice';
import PostsExcerpt from './PostExcerpt';
import { useEffect } from 'react';
import AddPost from './AddPost';
import axios from '../../api/axios';

const PostsList = () => {
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
    <section>
      <AddPost />
      {content}
    </section>
  );
};
export default PostsList;
