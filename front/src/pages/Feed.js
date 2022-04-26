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
          padding: '4rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '90vw',
          }}
        >
          <Box>
            <UsersList />
          </Box>
          <Box sx={{ width: '100%', marginLeft: '2rem' }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Feed;
