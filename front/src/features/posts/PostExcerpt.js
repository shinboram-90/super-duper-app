import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postsSlice';
import DelPost from './DelPost';

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div>
        {post.image !== null ? (
          <img alt={post.title} src={post.image} crossOrigin="true" />
        ) : (
          ''
        )}
        {/* <TimeAgo timestamp = {post.date}/> */}
        <div>Author : {post.username}</div>
        <div>{post.created_at}</div>
      </div>
      {/* <select className="post-content">{post.content.substring(0, 100)}</select> */}
      <DelPost postId={post.id} />
    </article>
  );
};

export default PostExcerpt;
