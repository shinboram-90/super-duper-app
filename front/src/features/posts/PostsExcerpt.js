import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from './postsSlice';
import axios from '../../api/axios';
import DelPost from './DelPost';
import CommentsList from '../comments/CommentsList';
import { useSelector } from 'react-redux';
import { setCommentsData } from '../comments/commentsSlice';

// MUI STYLES
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';

import moment from 'moment-timezone';

const PostsExcerpt = ({ post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const imageRef = useRef(null);
  const [image, setImage] = useState(post.image);
  const Input = styled('input')({
    display: 'none',
  });

  const canSave = [title, content].every(Boolean);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);
  const [editing, setEditing] = useState(false);

  const onClickRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
  };

  let imgPreview;
  if (image) {
    imgPreview = (
      <>
        <img
          style={{ maxWidth: 200 }}
          src={imageRef.current?.value ? URL.createObjectURL(image) : image}
          alt=""
          crossOrigin="true"
        />
        <button onClick={onClickRemoveImage}>X</button>
      </>
    );
  }

  // const time = post.created_at;
  // const timeConverted = moment
  //   .tz(time, 'Europe/Paris')
  //   .format('dddd, MMMM Do YYYY, h:mm a');

  const onEditPostClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', imageRef.current.value);
    }
    formData.append('title', title);
    formData.append('content', content);

    try {
      await axios.put(`api/posts/${post.id}`, formData).then((res) => {
        dispatch(editPost([post.id, res.data.modifications]));
      });

      setEditing(false);
    } catch (err) {
      console.error('Failed to save the post', err);
    }
  };

  const comments = useSelector((state) => state.comments.comments);
  const neededComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

  const toggleComments = () => {
    try {
      axios
        .get(`api/posts/${post.id}/comments`)
        .then((res) => dispatch(setCommentsData(res.data.commentList)));
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  return (
    <article className="post-excerpt" key={post.id}>
      {editing ? (
        <form onSubmit={onEditPostClick}>
          <TextField
            type="text"
            id="title"
            label="Title"
            defaultValue={post.title}
            helperText="Edit title"
            onChange={onTitleChanged}
            size="small"
          />
          <label htmlFor="image">
            <Input
              ref={imageRef}
              accept="image/*"
              id="image"
              type="file"
              onChange={onImageChanged}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>

          <div>{imgPreview}</div>
          <TextField
            type="text"
            id="content"
            label="Content"
            defaultValue={post.content}
            helperText="Edit content"
            onChange={onContentChanged}
            size="small"
          />

          <Button disabled={!canSave} type="submit" value="Confirm changes">
            Save changes
          </Button>
        </form>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div>
            {post.image ? (
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

            <div>{moment(post.created_at).format('dddd, MMMM Do YYYY')}</div>
          </div>
          <button type="button" onClick={() => setEditing(!editing)}>
            Edit
          </button>
        </div>
      )}
      <DelPost postId={post.id} />
      <button onClick={toggleComments}>comments: {post.comments}</button>

      <div>
        <CommentsList comments={neededComments} postId={post.id} />
      </div>
    </article>
  );
};

export default PostsExcerpt;
