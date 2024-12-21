import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useChatStore } from '@/stores/useChatStore';

import useUser from '@/hooks/useUser';

import { formatShortDate, formatTime } from '@/utils/formatDate';
import { isDifferentDay } from '@/utils/messageUtils';

import { ScrollArea } from '@/components/ui/ScrollArea';
import UserAvatar from '@/components/UserAvatar';

const GlobalChatContainer = () => {
  const { user } = useUser();
  const { globalMessages, subscribeToGlobalMessages, unsubscribeToGlobalMessages } = useChatStore();

  const messageRef = useRef(null);

  useEffect(() => {
    subscribeToGlobalMessages();

    return () => unsubscribeToGlobalMessages();
  }, [subscribeToGlobalMessages, unsubscribeToGlobalMessages]);

  useEffect(() => {
    if(messageRef.current && globalMessages) messageRef.current.scrollIntoView();
  }, [globalMessages]);
  
  return (
    <ScrollArea className="flex-1 p-4">
      {globalMessages.length !== 0 ? (
        <div className="flex flex-col gap-2">
          {globalMessages.map((message, index) => (
            <div key={message.id}>
              {isDifferentDay(message, globalMessages[index - 1]) && (
                <span className="block text-center font-medium text-xs text-muted-foreground mb-2">{formatShortDate(message.createdAt)}</span>
              )}
              <div key={message.id} className={twMerge("flex items-end gap-2", message.senderId === user.id ? "justify-end" : "justify-start")} ref={messageRef}>
                {message.senderId !== user.id && <UserAvatar name={message.user.name} avatar={message.user.avatar} />}

                <div className={twMerge("flex flex-col gap-1 rounded-lg p-3 max-w-[75%]", message.senderId === user.id ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  <div className="text-sm font-semibold">{message.senderId === user.id ? user.name : message.user.name}</div>
                  <span className="text-sm">{message.text}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</span>
                </div>

                {message.senderId === user.id && <UserAvatar name={user.name} avatar={user.avatar} />}
              </div>
            </div>
          ))}
      </div>
      ) : (
        <span className="block text-center font-medium text-sm text-muted-foreground">No message yet</span>
      )}
    </ScrollArea>
  );
};

export default GlobalChatContainer;