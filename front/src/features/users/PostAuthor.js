import Navbar from '../../components/Navbar';
import UsersList from './UsersList';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const PostAuthor = () => {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(`api/users/${id}`)
        .then((response) => {
          console.log(response);
          setUser(response.data.user[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, [id]);

  const User = () => {
    <>
      <main style={{ padding: '1rem' }}>
        <h2>User profile: {id}</h2>
        <img src={`${user.avatar}`} alt="avatar" />
        <p>
          {user.id} {user.role}
        </p>
        <p>
          Email: {user.email}
          <br />
          Bio : {user.biography}
        </p>

        <p>
          <button
          // onClick={() => {
          //   deleteUser(user.id);
          //   navigate("/users");
          // }}
          >
            Do sth
          </button>
        </p>
      </main>
    </>;
  };
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <UsersList /> */}
          <h2>User profile: {id}</h2>
          <img src={`${user.avatar}`} alt="avatar" />
          <p>
            {user.id} {user.role}
          </p>
          <p>
            Email: {user.email}
            <br />
            Bio : {user.biography}
          </p>
        </Box>
      </Container>
    </>
  );
};

export default PostAuthor;
