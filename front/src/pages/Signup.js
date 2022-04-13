import { useRef } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { Button, Box, TextField } from '@mui/material';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const { auth } = useAuth();
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);

  const navigate = useNavigate();

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
    <section style={{ padding: 100 }}>
      {/* <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          ref={username}
        />

        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          ref={email}
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter a password"
          ref={password}
        />
        <input
          id="password2"
          type="password"
          name="password2"
          placeholder="Confirm password"
          ref={password2}
        />
        <button type="submit">Create an account</button>
      </form> */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            label="Username"
            id="username"
            name="username"
            type="text"
            size="small"
            required
            inputRef={username}
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            type="text"
            size="small"
            required
            inputRef={email}
          />
          <TextField
            label="Password"
            type="password"
            helperText="Please enter your password"
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

      <p>
        Already have an account?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Signup;
