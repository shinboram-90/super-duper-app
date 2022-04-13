import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserPage from './UserPage';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (response) {
        console.log(response.data.userList[0]);
        setUsers(response.data.userList[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {}
      <h1>UserList</h1>
      <ul>
        {users.map((user) => (
          <UserPage
            key={'user' + user.id}
            user={user}
            // onEdit={editUser}
            // onDelete={deleteUser}
            // fetchUsersPosts={fetchUsersPosts}
          />
        ))}
      </ul>

      <Outlet />
    </>
  );
};

export default UserList;
