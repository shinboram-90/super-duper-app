import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Signup = () => {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('not natching');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post('/api/signup', user);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    navigate('/api/login');
  };

  return (
    <section style={{ padding: 100 }}>
      <form onSubmit={handleSubmit}>
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
      </form>
      <p>
        Already registered?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Signup;
