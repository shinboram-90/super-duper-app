import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate('/login');
  };
  return (
    <section>
      <p>Successfully logout</p>
      <p>That was a mistake ?</p>
      <button onClick={backToLogin}>Login</button>
    </section>
  );
};

export default Logout;
