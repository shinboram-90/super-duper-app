import { useState } from 'react';
import { addPost } from './postsSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';

export const AddPost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const formData = new FormData();

  if (image) {
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('content', content);
  } else {
    formData.append('title', title);
    formData.append('content', content);
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  const onClickRemoveImage = () => {
    setImage(null);
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img
          style={{ maxWidth: 400 }}
          src={URL.createObjectURL(image)}
          alt=""
          crossOrigin="true"
        />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  const canSave = [title, content].every(Boolean);

  const onSavePostClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await axios.post('api/posts', formData).then((res) => {
          dispatch(addPost(res.data.newPost));
        });

        setTitle('');
        setContent('');
        setImage(null);
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  return (
    <section>
      <h2>Add a new post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
          value={title}
        />

        <input type="file" id="image" name="image" onChange={onImageChanged} />
        <div>{imgPreview}</div>

        <label htmlFor="postContent">Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          onChange={onContentChanged}
          value={content}
        />

        <input type="submit" disabled={!canSave} value="Publish Post" />
      </form>
    </section>
  );
};

export default AddPost;

// import { useState } from 'react';
// import { addPost } from './postsSlice';
// import { useDispatch } from 'react-redux';
// import axios from '../../api/axios';

// export const AddPost = () => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);

//   const onTitleChanged = (e) => setTitle(e.target.value);
//   const onContentChanged = (e) => setContent(e.target.value);
//   const onImageChanged = (e) => setImage(e.target.files[0]);

//   const onClickRemoveImage = () => {
//     setImage(null);
//   };

//   const reset = () => {
//     setTitle('');
//     setContent('');
//     setImage(null);
//   };

//   let imgPreview;
//   if (image) {
//     imgPreview = (
//       <>
//         <img
//           style={{ maxWidth: 400 }}
//           src={URL.createObjectURL(image)}
//           alt=""
//           crossOrigin="true"
//         />
//         <button onClick={onClickRemoveImage}>X</button>
//       </>
//     );
//   }

//   const canSave = [title, content].every(Boolean);

//   const onSavePostClicked = async (e) => {
//     e.preventDefault();
//     if (canSave) {
//       const formData = new FormData();

//       if (image) {
//         formData.append('image', image);
//         formData.append('title', title);
//         formData.append('content', content);
//       } else {
//         formData.append('title', title);
//         formData.append('content', content);
//       }
//       try {
//         await axios.post('api/posts', formData).then((res) => {
//           console.log(res.data.newPost);
//           dispatch(addPost(res.data.newPost));
//         });
//         reset();
//       } catch (err) {
//         console.error('Failed to save the post', err);
//       }
//     }
//   };

//   return (
//     <section>
//       <h2>Add a new post</h2>
//       <form onSubmit={onSavePostClicked}>
//         <label htmlFor="postTitle">Title:</label>
//         <input
//           type="text"
//           id="postTitle"
//           name="postTitle"
//           placeholder="Posts's title"
//           onChange={onTitleChanged}
//           value={title}
//         />

//         <input type="file" id="image" name="image" onChange={onImageChanged} />
//         <div>{imgPreview}</div>

//         <label htmlFor="postContent">Content:</label>
//         <textarea
//           id="postContent"
//           name="postContent"
//           placeholder="Posts's Content"
//           onChange={onContentChanged}
//           value={content}
//         />

//         <input type="submit" disabled={!canSave} value="Publish Post" />
//       </form>
//     </section>
//   );
// };

// export default AddPost;
