import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

const UserProvider = ({ children }) => {
  const { fetchUser } = useAuthStore();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingUser(true);
      try {
        await fetchUser();
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUser();
  }, [fetchUser]);

  if (isLoadingUser) return null

  return <>{children}</>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
