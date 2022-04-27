import useAuth from '../../hooks/useAuth';
import moment from 'moment-timezone';
import DeleteProfile from './DeleteProfile';

// MUI STYLES
import {
  TextField,
  Box,
  Avatar,
  Container,
  Card,
  Typography,
} from '@mui/material';
import random2 from '../../assets/random2.png';

const EditProfile = () => {
  const { auth } = useAuth();

  return (
    <Container>
      <Box sx={{ paddingLeft: '2rem', maxWidth: '800px' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '45rem',
            paddingBottom: '1.5rem',
          }}
        >
          <Box
            sx={{
              paddingTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <form style={{ width: '80%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  '& > :not(style)': { m: 1.5 },
                }}
              >
                <Avatar sx={{ width: 150, height: 150 }}>
                  <img
                    alt="default avatar"
                    height="150"
                    src={random2}
                    crossOrigin="true"
                  />
                </Avatar>

                <TextField
                  id="username"
                  name="username"
                  size="small"
                  helperText="Username"
                  placeholder={auth.username}
                  disabled
                  fullWidth
                />

                <TextField
                  id="email"
                  name="email"
                  size="small"
                  placeholder={auth.email}
                  disabled
                  fullWidth
                  helperText="Email"
                />

                <Typography variant="caption" sx={{ alignSelf: 'flex-start' }}>
                  {' '}
                  Member since:{' '}
                  {auth && auth.created_at
                    ? moment(auth.created_at).format('MMMM Do YYYY')
                    : ''}
                </Typography>
              </Box>
            </form>
          </Box>
        </Card>
        <DeleteProfile userId={auth.id} />
      </Box>
    </Container>
  );
};

export default EditProfile;
