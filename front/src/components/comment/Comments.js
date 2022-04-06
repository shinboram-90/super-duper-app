import React from 'react';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthProvider';

// const Comment = (comment) => {
//   return (
//     <article>
//       <h3>{comment.title}</h3>
//       <p>{comment.content}</p>
//       <div>{comment.username}</div>
//     </article>
//   );
// };

const Comments = ({ id, post, comments }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { user } = useContext(AuthContext);
  const userId = user.user[0].id;

  // const contentComponent = comments.map((comment) => (
  //   <Comment key={'comment' + comment.id} comment={comment} />
  // ));

  return (
    <section>
      <aside>
        <h1>Comments</h1>
        <>
          {comments.map((comment) => (
            <li key={'comment' + comment.id} comment={comment}>
              <h2>title: {comment.title}</h2>
              <p>content: {comment.content}</p>
              <div>author: {comment.username}</div>
            </li>
          ))}
        </>
        {/* WTF???
        {contentComponent} */}
      </aside>

      <button type="submit">Edit Comment</button>
      <button type="submit">Delete Comment</button>
    </section>
  );
};

export default Comments;
