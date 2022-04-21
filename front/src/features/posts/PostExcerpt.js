// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { editPost } from './postsSlice';
// import axios from '../../api/axios';
// import DelPost from './DelPost';

// const PostExcerpt = ({ post }) => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState(post.title);
//   const [content, setContent] = useState(post.content);
//   const [image, setImage] = useState(post.image);

//   const formData = new FormData();
//   if (image) {
//     formData.append('image', image);
//     formData.append('title', title);
//     formData.append('content', content);
//   } else {
//     formData.append('title', title);
//     formData.append('content', content);
//   }

//   // const formData = {
//   //   title: titleInput.currentValue,
//   //   content: contentInput.currentValue,
//   //   image,
//   // };
//   const canSave = [title, content].every(Boolean);

//   const onTitleChanged = (e) => setTitle(e.target.value);
//   const onContentChanged = (e) => setContent(e.target.value);
//   const onImageChanged = (e) => setImage(e.target.files[0]);
//   const [editing, setEditing] = useState(false);

//   const onClickRemoveImage = () => {
//     setImage(null);
//   };

//   let imgPreview;
//   if (image) {
//     imgPreview = (
//       <>
//         <img
//           style={{ maxWidth: 400 }}
//           src={post.image}
//           alt=""
//           crossOrigin="true"
//         />
//         <button onClick={onClickRemoveImage}>X</button>
//       </>
//     );
//   }

//   // const reset = () => {
//   //   setTitle('');
//   //   setContent('');
//   //   setImage(null);
//   //   setEditing(false);
//   // };

//   const onEditPostClick = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`api/posts/${post.id}`, formData).then((res) => {
//         dispatch(editPost(res.data.modifications));
//         // console.log([res.data.modifications, post.id]);
//       });
//       setTitle(post.title);
//       setContent(post.content);
//       setImage(post.image);
//       setEditing(false);
//     } catch (err) {
//       console.error('Failed to save the post', err);
//     }
//   };
//   return (
//     <article className="post-excerpt" key={post.id}>
//       {editing ? (
//         <form onSubmit={onEditPostClick}>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={title}
//             // defaultValue={post.title}
//             // ref={titleInput}
//             onChange={onTitleChanged}
//           />

//           <label htmlFor="content">Content:</label>
//           <textarea
//             id="content"
//             name="content"
//             // defaultValue={post.content}
//             // ref={contentInput}
//             value={content}
//             onChange={onContentChanged}
//           />
//           <input type="file" name="image" onChange={onImageChanged} />
//           <div>{imgPreview}</div>

//           <input type="submit" disabled={!canSave} value="Confirm changes" />
//         </form>
//       ) : (
//         <div>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           <div>
//             {post.image ? (
//               <img
//                 alt={post.title}
//                 src={post.image}
//                 crossOrigin="true"
//                 style={{ maxWidth: 500 }}
//               />
//             ) : (
//               ''
//             )}

//             <div>Author : {post.username}</div>
//             <div>{post.created_at}</div>
//           </div>
//           <button type="button" onClick={() => setEditing(!editing)}>
//             Edit
//           </button>
//         </div>
//       )}
//       <DelPost postId={post.id} />
//     </article>
//   );
// };

// export default PostExcerpt;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPost, setPostsData, getOnePost } from './postsSlice';
import axios from '../../api/axios';
import DelPost from './DelPost';

const PostExcerpt = ({ post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);

  // const formData = new FormData();

  // if (image) {
  //   formData.append('image', image);
  //   formData.append('title', title);
  //   formData.append('content', content);
  // } else {
  //   formData.append('title', title);
  //   formData.append('content', content);
  // }
  const canSave = [title, content].every(Boolean);

  const formData = {
    title,
    content,
    image,
  };

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) =>
    setImage(URL.createObjectURL(e.target.files[0]));
  const [editing, setEditing] = useState(false);

  const onClickRemoveImage = () => {
    setImage(null);
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img style={{ maxWidth: 400 }} src={image} alt="" crossOrigin="true" />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  useEffect(() => {
    axios
      .get(`api/posts/`)
      .then((res) => dispatch(setPostsData(res.data.postList)));
  }, [dispatch, post.id, title, content, image]);

  const onEditPostClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`api/posts/${post.id}`, formData).then((res) => {
        console.log(formData);
        console.log(res.data.modifications);
        dispatch(editPost(res.data.modifications));
      });

      setTitle('');
      setContent('');
      setImage(null);
      setEditing(false);
    } catch (err) {
      console.error('Failed to save the post', err);
    }
  };
  return (
    <article className="post-excerpt" key={post.id}>
      {editing ? (
        <form onSubmit={onEditPostClick}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title || ''}
            onChange={onTitleChanged}
          />

          <input type="file" name="image" onChange={onImageChanged} />
          <div>{imgPreview}</div>

          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content || ''}
            onChange={onContentChanged}
          />
          <input type="submit" disabled={!canSave} value="Confirm changes" />
        </form>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div>
            {post.image !== null ? (
              <img
                alt={post.title}
                src={post.image}
                crossOrigin="true"
                style={{ maxWidth: 500 }}
              />
            ) : (
              ''
            )}

            <div>Author : {post.username}</div>
            <div>{post.created_at}</div>
          </div>
          <button type="button" onClick={() => setEditing(!editing)}>
            Edit
          </button>
        </div>
      )}
      <DelPost postId={post.id} />
    </article>
  );
};

export default PostExcerpt;
