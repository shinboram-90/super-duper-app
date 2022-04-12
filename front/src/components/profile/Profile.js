import { useState, useContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

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
    <>
      <div>My Profile</div>
      <p>username: {auth.username}</p>
      <p>email: {auth.email}</p>

      <img alt="user avatar" src={auth.avatar} crossOrigin="true" />
      <button onClick={handleClick}>Edit Profile</button>
    </>
  );
};

export default Profile;
