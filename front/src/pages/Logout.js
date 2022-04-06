import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate('/login');
  };

  const backToRegister = () => {
    navigate('/register');
  };
  return (
    <section>
      <p>Successfully logout</p>
      <p>That was a mistake ?</p>
      <button onClick={backToLogin}>Login</button>
      <button onClick={backToRegister}>Register</button>
    </section>
  );
};

export default Logout;
