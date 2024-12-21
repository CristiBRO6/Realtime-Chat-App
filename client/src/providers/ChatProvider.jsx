import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useChatStore } from '@/stores/useChatStore';

import MessageSkeleton from '@/components/Skeletons/MessageSkeleton';

const ChatProvider = ({ children }) => {
  const { getMessages, selectedUser } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        await getMessages(selectedUser.id);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [getMessages, selectedUser]);

  if (isLoading) return <MessageSkeleton />;

  return <>{children}</>;
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatProvider;