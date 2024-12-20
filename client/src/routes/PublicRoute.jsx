import { Outlet, Navigate } from 'react-router-dom';

import useUser from '@/hooks/useUser';

const PublicRoute = () => {
  const { user } = useUser();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
