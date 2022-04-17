import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

import useAuth from '../hooks/useAuth';

import { Button, Box, TextField, Container } from '@mui/material';

// import { DisplayToggles } from './display_toggles';

const Login = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const redirectPath = location.state?.path || '/';
  // const password = useRef(null);

  // const onChange = (event) => {
  //   if (event.target.value.match(phoneRegex)) {
  //     setErrorText("");
  //     setPhone(event.target.value);
  //   } else {
  //     setErrorText("invalid format");
  //   }
  // };

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

        localStorage.setItem('user', JSON.stringify(response.data.user[0]));

        setAuth(user);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      console.error(`Catching ${err}`);
    }
  };

  return (
    <>
      <Container className="login__container" style={{ padding: 100 }}>
        <h1>WELCOME TO GROUPOMANIA</h1>
        <form onSubmit={handleSubmit} method="POST">
          <Box
            sx={{
              maxWidth: '500px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& > :not(style)': { m: 1 },
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

          {/* {isLoading ? (
            <div className="loading">
              <span>Loading...</span>
            </div>
          ) : ( */}

          {/* // )} */}
        </form>

        <p>
          Need an account?
          <br />
          <span className="line">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </Container>
    </>
  );
};

export default Login;
