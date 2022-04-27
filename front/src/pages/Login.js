import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import iconLeftColored from '../assets/iconLeftColored.svg';
import { Button, Box, TextField } from '@mui/material';

const Login = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const backToRegister = () => {
    navigate('/register');
  };

  const redirectPath = location.state?.path || '/';

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI();
  };

  const sendDataToAPI = async () => {
    const userData = {
      ...data,
    };
    try {
      const response = await axios.post('/api/login', userData);
      if (response.status === 200) {
        console.log(response.data);
        setData({});
        const user = response.data.user[0];

        localStorage.setItem('user', JSON.stringify(user));
        navigate(redirectPath, { replace: true });
        setAuth(user);
      }
    } catch (err) {
      console.error(`Catching ${err}`);
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
          <img
            alt="logo"
            src={iconLeftColored}
            height="380"
            style={{ marginLeft: '-30px' }}
          />
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
                // helperText={text === "" ? 'Empty field!' : "Please enter your username"}
                id="username"
                name="username"
                value={data.username || ''}
                type="text"
                size="small"
                required
                onChange={handleChange}
                helperText="Please enter your username"

                // error={text === ""}
              />

              <TextField
                label="Password"
                type="password"
                helperText="Please enter your password"
                id="password"
                name="password"
                value={data.password || ''}
                size="small"
                autoComplete="current-password"
                required
                onChange={handleChange}
              />
              <Button type="submit" variant="contained">
                Login
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
            Need an account?
            <Button
              variant="outlined"
              sx={{ marginTop: '1rem' }}
              onClick={backToRegister}
            >
              Register
            </Button>
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
