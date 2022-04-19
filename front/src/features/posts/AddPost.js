import { useEffect, useState } from 'react';
import { addNewPost } from './postsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AddPost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  // const [preview, setPreview] = useState();
  // const [file, setFile] = useState();
  // const params = useParams();
  // const id = params.postId;
  // console.log(id);

  // useEffect(() => {
  //   if (!image) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(image);
  //   setPreview(objectUrl);
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [image]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);

  // // const canSave = [title, content, userId, image].every(Boolean);

  const formData = new FormData();

  if (image) {
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('content', content);
  } else {
    formData.append('title', title);
    formData.append('content', content);
  }

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

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost(formData)).unwrap();
        setTitle('');
        setContent('');
        setImage(null);
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
        />

        <input type="file" id="image" name="image" onChange={onImageChanged} />
        <div>{imgPreview}</div>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          onChange={onContentChanged}
        />
      </form>

      <button type="submit" onClick={onSavePostClicked} disabled={!canSave}>
        Publish Post
      </button>
    </section>
  );
};

export default AddPost;
