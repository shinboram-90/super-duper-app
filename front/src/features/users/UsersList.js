import axios from '../../api/axios';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUsersData } from './usersSlice';
import { useSearchParams, useLocation, NavLink } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Stack,
  Chip,
  FormControl,
  TextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import random2 from '../../assets/random2.png';
import random20 from '../../assets/random20.jpg';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

const UsersList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    axios
      .get('api/users')
      .then((res) => dispatch(setUsersData(res.data.userList)));
  }, [dispatch]);

  return (
    <aside>
      <h3>My colleagues</h3>

      <FormControl sx={{ margin: '2rem 0' }}>
        <TextField
          label="Search by username..."
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </FormControl>

      {Object.values(users)
        .filter((user) => {
          let filter = searchParams.get('filter');
          if (!filter) return true;
          let username = user.username.toLowerCase();
          return username.startsWith(filter.toLowerCase());
        })
        .map((user) => (
          <QueryNavLink
            style={{
              display: 'block',
              margin: '1rem 0',
            }}
            to={`users/${user.id}`}
            key={'users' + user.id}
          >
            {user && user.role === 'user' ? (
              <Stack direction="row" spacing={1}>
                <Chip
                  avatar={<Avatar alt="User avatar" src={random2} />}
                  label={user.username}
                  variant="outlined"
                  sx={{ cursor: 'pointer', backgroundColor: 'white' }}
                />{' '}
              </Stack>
            ) : (
              <Badge color="secondary" badgeContent={'Admin'}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    avatar={<Avatar alt="Admin avatar" src={random20} />}
                    label={user.username}
                    variant="outlined"
                    sx={{ cursor: 'pointer', backgroundColor: 'white' }}
                  />
                </Stack>
              </Badge>
            )}
          </QueryNavLink>
        ))}
    </aside>
  );
};

export default UsersList;
