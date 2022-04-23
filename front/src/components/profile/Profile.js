import { useState, useContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Box } from '@mui/system';

const Profile = () => {
  const { auth } = useAuth();

  console.log(auth);

  const [profile, setProfile] = useState();

  const handleClick = async () => {
    const response = await axios.put(`/api/users/${auth.id}`);
    // console.log(response.data.currentUser[0]);
    setProfile(response.data);
  };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  // if (!auth) {
  //   return <Navigate replace to="/login" />;
  // }
  // console.log(auth);
  return (
    <Box>
      <h3>My Profile</h3>
      <p>username: {auth.username}</p>
      <p>email: {auth.email}</p>

      <img alt="user avatar" src={auth.avatar} crossOrigin="true" />
      <button onClick={handleClick}>Edit Profile</button>
    </Box>
  );
};

export default Profile;
