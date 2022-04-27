import { useNavigate } from 'react-router-dom';
import { Button, Container, Box } from '@mui/material';
import rainyCloudLight from '../assets/rainyCloudLight.png';

const Missing = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        className="login__container"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          right: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '500px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>Page not found</h2>
          <Box>
            <img alt="logo" src={rainyCloudLight} height="380" />
          </Box>
          <p>
            Sorry, we can&apos;t find the page you&apos;re looking for. It might
            have been removed or renamed, or maybe it never existed.
          </p>

          <Button variant="contained" onClick={() => navigate('/')}>
            Go home
          </Button>
        </Box>
      </div>
    </Container>
  );
};
export default Missing;
