import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Button, Box, TextField } from '@mui/material';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import iconLeftColored from '../assets/iconLeftColored.svg';

const Signup = () => {
  const { auth } = useAuth();
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);

  const navigate = useNavigate();
  const backToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      console.log('not natching');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post('/api/signup', user);
        if (response.data) {
          navigate('/login');

          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
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
          <img alt="logo" src={iconLeftColored} height="380" />
        </Box>
        <Box sx={{ marginTop: '-8rem' }}>
          <form onSubmit={handleSubmit} method="POST">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& > :not(style)': { m: 1 },
                marginBottom: '3.5rem',
              }}
            >
              <TextField
                label="Username"
                id="username"
                name="username"
                type="text"
                size="small"
                required
                helperText="Choose a username"
                inputRef={username}
              />
              <TextField
                label="Email"
                id="email"
                name="email"
                type="text"
                size="small"
                required
                helperText="Enter your email address"
                inputRef={email}
              />
              <TextField
                label="Password"
                type="password"
                helperText="Choose a password"
                id="password"
                name="password"
                size="small"
                inputRef={password}
                required
              />

              <TextField
                label="Password"
                type="password"
                helperText="Confirm your password"
                id="password"
                name="password2"
                size="small"
                inputRef={password2}
                required
              />
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            </Box>
          </form>

          <p
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            Already have an account?
            <Button
              variant="outlined"
              sx={{ marginTop: '1rem' }}
              onClick={backToLogin}
            >
              Register
            </Button>
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
