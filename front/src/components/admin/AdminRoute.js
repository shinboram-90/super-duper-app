import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { auth } = useAuth();

  if (auth.role !== 'admin') {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};

export default AdminRoute;
