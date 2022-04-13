import React from 'react';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

import { Avatar } from '@mui/material';
const UserPage = ({ user }) => {
  return (
    <section>
      <h2>{user.username}</h2>
      {user.avatar !== null || undefined ? (
        <Avatar sx={{ width: 100, height: 100 }}>
          <img alt="avatar" src={user.avatar} crossOrigin="true" />
        </Avatar>
      ) : (
        <Avatar sx={{ width: 100, height: 100 }}>
          {' '}
          <img
            alt="avatar"
            height="100"
            src={defaultAvatar}
            crossOrigin="true"
          />
        </Avatar>
      )}
      <p>
        <span>{user.first_name}</span>
        <span>{user.last_name}</span>
      </p>
      <p>{user.email}</p>
      <p>{user.biography}</p>
    </section>
  );
};

export default UserPage;
