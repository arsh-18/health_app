import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

//   console.log('Token:', token);
//   console.log('Role:', role);
//   console.log('Allowed Roles:', allowedRoles);
  console.log(allowedRoles)
  if (!token) {
    console.log('No token found, redirecting to login.');
    return <Navigate to='/login' replace={true} />;
  }

  if (!allowedRoles.includes(role)) {
    console.log('Role not allowed, redirecting to login.');
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
