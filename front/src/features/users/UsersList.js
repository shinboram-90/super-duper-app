import axios from '../../api/axios';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUsersData } from './usersSlice';
import {
  Outlet,
  useSearchParams,
  useLocation,
  NavLink,
} from 'react-router-dom';
import PostsList from '../posts/PostsList';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

const UsersList = () => {
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    axios
      .get('api/users')
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch]);

  return (
    <>
      {}

      <ul>
        <h2>UserList</h2>

        {Object.values(users)
          .filter((user) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let username = user.username.toLowerCase();
            return username.startsWith(filter.toLowerCase());
          })
          .map((user) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`users/${user.id}`}
              key={'users' + user.id}
            >
              {user.role === 'user' ? (
                <div color="blue">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg"
                    alt="admin avatar"
                  />
                  {user.username}
                </div>
              ) : (
                <div color="teal">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                    alt="user avatar"
                  />
                  {user.username}
                  <div>{user.role}</div>
                </div>
              )}
            </QueryNavLink>
          ))}
        {/* <UserPage
          key={'user' + user.id}
          user={user}
          onEdit={editUser}
          onDelete={deleteUser}
          fetchUsersPosts={fetchUsersPosts}
        />
        ))} */}

        {/* <Outlet /> */}
      </ul>
    </>
  );
};

export default UsersList;
