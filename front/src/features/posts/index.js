import { useState } from 'react';
import ListePosts from './ListePosts';
import AddPost from './AddPost';

const Posts = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: null,
  });
  return (
    <div>
      <h2>MAIN PAGE navbar should be here</h2>
      <AddPost post={post} setPost={setPost} />
      <ListePosts setPost={setPost} />
    </div>
  );
};

export default Posts;
