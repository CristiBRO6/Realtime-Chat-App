import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useChatStore } from '@/stores/useChatStore';

const ChatProvider = ({ children }) => {
  const { getUserChat, getMessages, selectedUser } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        await getUserChat(selectedUser);
        await getMessages(selectedUser);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [getUserChat, getMessages, selectedUser]);

  if (isLoading) return null;

  return <>{children}</>;
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatProvider;