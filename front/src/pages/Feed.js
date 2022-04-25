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
          padding: '2rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <UsersList />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Feed;
