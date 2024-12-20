import { Outlet, Navigate } from 'react-router-dom';

import useUser from '@/hooks/useUser';

const ProtectedRoute = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
