import { useState, useContext, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

const Profile = () => {
  // const userStorage = JSON.parse(localStorage.getItem('auth'));
  const [me, setMe] = useState();
  const { user } = useContext(AuthContext);

  console.log(user);

  const fetchCurrentUser = async () => {
    const response = await axios.get('/api/profile');
    // console.log(response.data.currentUser[0]);
    return setMe(response.data.currentUser[0]);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // if (!auth) {
  //   return <Navigate replace to="/login" />;
  // }
  // console.log(auth);
  return (
    <>
      <div>My Profile</div>
      <p>username: {me.username}</p>
      <p>email: {me.email}</p>
    </>
  );
};

export default Profile;
