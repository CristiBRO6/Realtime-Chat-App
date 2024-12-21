import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useChatStore } from '@/stores/useChatStore';

import MessageSkeleton from '@/components/Skeletons/MessageSkeleton';

const GlobalChatProvider = ({ children }) => {
  const { getGlobalMessages } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        await getGlobalMessages();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [getGlobalMessages]);

  if (isLoading) return <MessageSkeleton />;

  return <>{children}</>;
};

GlobalChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalChatProvider;