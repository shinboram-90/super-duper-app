import React from 'react';
import { Outlet } from 'react-router-dom';

const UserList = () => {
  return (
    <>
      <h1>UserList</h1>
      <Outlet />
    </>
  );
};

export default UserList;
