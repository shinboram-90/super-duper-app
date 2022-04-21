// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import useAuth from '../../hooks/useAuth';
// import DeletePost from './DeletePost';
// import AddPostForm from './AddPostForm';
// import EditPostForm from './EditPostForm';
// import Comments from '../comment/Comments';

// const SinglePostPage = ({ post, onDelete, onEdit }) => {
//   const [comments, setComments] = useState([]);
//   const [likes, setLikes] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);

//   const { auth } = useAuth();
//   const userId = auth.id;
//   const postId = post.id;
//   const image = post.image;

//   const [showComments, setShowComments] = useState(false);

//   const toggle = () => {
//     setShowComments(!showComments);
//   };

//   const fetchComments = async (postId) => {
//     try {
//       const response = await axios.get(`/api/posts/${postId}/comments`);

//       if (response.data.commentList !== undefined) {
//         setComments(response.data.commentList);
//       }
//     } catch (err) {
//       console.error('Failed to fetch comments: ', err);
//     }
//   };

//   const fetchLikes = async (postId) => {
//     try {
//       const response = await axios.get(`/api/posts/${postId}/likes`);

//       if (response.status === 200) {
//         setLikes(response.data.totalLikes[0].total);
//       }
//     } catch (err) {
//       console.error('Failed to fetch likes: ', err);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`/api/posts/${postId}/likes`, {
//         user_id: userId,
//         post_id: postId,
//         is_liked: isLiked,
//       });

//       if (response.status === 200) {
//         console.log(response);
//         setLikes(
//           isLiked ? (prevLikes) => prevLikes - 1 : (prevLikes) => prevLikes + 1
//         );
//         setIsLiked(!isLiked);
//       }
//     } catch (err) {
//       console.error('Failed to give likes: ', err);
//     }
//   };

//   useEffect(() => {
//     fetchLikes(postId);
//   }, [postId, userId, likes, isLiked]);

//   useEffect(() => {
//     fetchComments(postId);
//   }, [postId]);

//   return (
//     <section>
//       <h1>Post Page</h1>
//       <br />
//       <h2>{post.title}</h2>
//       <p>{post.content}</p>
//       <div className="flexGrow"></div>
//       {image !== null ? (
//         <img alt={post.title} src={image} crossOrigin="true" />
//       ) : (
//         ''
//       )}

//       {likes ? (
//         <button onClick={handleLike}>Likes: {likes}</button>
//       ) : (
//         <button onClick={handleLike}>Likes: </button>
//       )}

//       <EditPostForm id={post.id} onEdit={onEdit} />
//       <DeletePost id={post.id} onDelete={onDelete} />
//       <button onClick={toggle}>{post.comments}</button>
//       {showComments && <Comments id={postId} comments={comments} post={post} />}
//       <hr />
//     </section>
//   );
// };
// export default SinglePostPage;
