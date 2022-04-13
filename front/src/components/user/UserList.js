import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserPage from './UserPage';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (response) {
        console.log(response.data.userList[0]);
        setIsLoading(false);
        setUsers(response.data.userList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return null;

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
