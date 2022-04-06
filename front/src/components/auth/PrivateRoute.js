import { Navigate, Outlet } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../../context/AuthProvider';

const PrivateRoute = ({ user, children, redirectPath = '/login' }) => {
  // const location = useLocation();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
