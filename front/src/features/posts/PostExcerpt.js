import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from './postsSlice';
import axios from '../../api/axios';
import DelPost from './DelPost';
import CommentsList from '../comments/CommentsList';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setCommentsData } from '../comments/commentsSlice';
import AddCommentForm from '../comments/AddCommentForm';
import useAuth from '../../hooks/useAuth';

const PostExcerpt = ({ post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { auth } = useAuth();
  // console.log(auth);

  const imageRef = useRef(null);
  const [image, setImage] = useState(post.image);

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

  console.log(neededComments);

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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            onChange={onTitleChanged}
          />

          <input
            ref={imageRef}
            type="file"
            id="image"
            name="image"
            onInput={onImageChanged}
          />
          <div>{imgPreview}</div>

          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            defaultValue={post.content}
            onChange={onContentChanged}
          />
          <input disabled={!canSave} type="submit" value="Confirm changes" />
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
            <div>{post.created_at}</div>
            <button onClick={toggleComments}>comments: {post.comments}</button>
          </div>
          <button type="button" onClick={() => setEditing(!editing)}>
            Edit
          </button>
        </div>
      )}
      <DelPost postId={post.id} />
      <AddCommentForm postId={post.id} />
      <div>
        <CommentsList comments={neededComments} postId={post.id} />
        REALLY?
        {/* {comments.map((comment) => {
          <p key={comment.id}>COMMENT PPPPPP:{comment.content}</p>;
        })} */}
      </div>
    </article>
  );
};

export default PostExcerpt;
