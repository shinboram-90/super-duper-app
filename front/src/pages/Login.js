import { useRef, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { loginCall } from '../api/apiCall';
import AuthContext from '../context/AuthProvider';

const Login = () => {
  const { isLoggedIn, isLoading, dispatch } = useContext(AuthContext);

  const username = useRef(null);
  const password = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    loginCall(
      {
        username: username.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return isLoggedIn ? (
    <Navigate to={'/'} />
  ) : (
    <section style={{ padding: 100 }}>
      <h1>WELCOME TO GROUPOMANIA</h1>

      <form onSubmit={handleLogin} method="POST">
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            ref={username}
            placeholder="Enter your username"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            ref={password}
            required
          />
        </label>
        {isLoading ? (
          <div className="loading">
            <span>Loading...</span>
          </div>
        ) : (
          <button disabled={isLoading} type="submit">
            Login
          </button>
        )}
      </form>

      <p>
        Need an account?
        <br />
        <span className="line">
          <Link to="/register">Register</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
