import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import UsersList from '../features/users/UsersList';
import { Container, Box } from '@mui/material';

const Feed = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ display: 'flex' }}>
          <UsersList />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Feed;
