import React from 'react';

const DeletePost = ({ id, onDelete }) => {
  return (
    <div
      style={{ position: 'relative' }}
      className="delete_button"
      id="delete_post_button"
      onClick={() => onDelete(id)}
    >
      Delete
      <span className="delete__helper--click"></span>
    </div>
  );
};

export default DeletePost;
