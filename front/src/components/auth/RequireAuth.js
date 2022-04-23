import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { auth } = useAuth();
  console.log(auth);

  if (!auth) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
