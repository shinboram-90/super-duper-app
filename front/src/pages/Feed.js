import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import UsersList from '../features/users/UsersList';
import { Box } from '@mui/material';

const Feed = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          padding: '4rem',
          backgroundColor: 'rgba(255,215,216, 0.1)',
        }}
      >
        <div sx={{ width: '100vw' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '90vw',
            }}
          >
            <div className="main__userslist--responsive">
              <UsersList />
            </div>
            <Box sx={{ width: '100%' }}>
              <Outlet />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Feed;
