import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import UsersList from '../features/users/UsersList';
import { Container, Box } from '@mui/material';

const Feed = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: 'grid',
          justifyItems: 'stretch',
          padding: '2rem',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <UsersList />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Feed;
