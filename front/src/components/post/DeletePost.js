import React from 'react';

const DeletePost = ({ id, onDelete }) => {
  return (
    <span
      className="delete_button"
      id="delete_post_button"
      onClick={() => onDelete(id)}
    >
      Delete
    </span>
  );
};

export default DeletePost;
