import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useChatStore } from '@/stores/useChatStore';

const GlobalChatProvider = ({ children }) => {
  const { getGlobalMessages, selectedUser } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        await getGlobalMessages(selectedUser);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [getGlobalMessages, selectedUser]);

  if (isLoading) return null;

  return <>{children}</>;
};

GlobalChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalChatProvider;