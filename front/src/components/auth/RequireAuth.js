import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
