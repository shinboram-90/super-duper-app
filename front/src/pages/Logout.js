import { useNavigate } from 'react-router-dom';
import iconColored from '../assets/iconColored.svg';
import { Button, Box } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate('/login');
  };

  const backToRegister = () => {
    navigate('/register');
  };
  return (
    <div
      className="login__container"
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        right: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box>
          <img alt="logo" src={iconColored} height="380" />
        </Box>
        <Box sx={{ marginTop: '-5rem' }}>
          <h4 style={{ fontSize: '1.5rem' }}>Successfully logout</h4>
          <p>That was a mistake ?</p>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button variant="outlined" onClick={backToRegister}>
              Register
            </Button>
            <Button variant="contained" onClick={backToLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Logout;
