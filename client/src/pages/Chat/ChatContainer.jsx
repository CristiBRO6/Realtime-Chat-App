import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useChatStore } from '@/stores/useChatStore';

import useUser from '@/hooks/useUser';

import { formatShortDate, formatTime } from '@/utils/formatDate';
import { isDifferentDay } from '@/utils/messageUtils';

import { ScrollArea } from '@/components/ui/ScrollArea';
import UserAvatar from '@/components/UserAvatar';

const ChatContainer = () => {
  const { user } = useUser();
  const { messages, typing, subscribeToMessages, unsubscribeToMessages, subscribeToTyping } = useChatStore();

  const messageRef = useRef(null);

  useEffect(() => {
    subscribeToMessages();
    subscribeToTyping();

    return () => unsubscribeToMessages();
  }, [subscribeToMessages, unsubscribeToMessages, subscribeToTyping]);

  useEffect(() => {
    if (messageRef.current && messages) messageRef.current.scrollIntoView();
  }, [messages]);

  return (
    <>
      <ScrollArea className="flex-1 px-4 py-2">
        {messages.length !== 0 ? (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={message.id}>
                {isDifferentDay(message, messages[index - 1]) && (
                  <span className="block text-center font-medium text-xs text-muted-foreground mb-2">{formatShortDate(message.createdAt)}</span>
                )}

                <div className={twMerge("flex items-end gap-2", message.senderId === user.id ? "justify-end" : "justify-start")} ref={messageRef}>
                  {message.senderId !== user.id && <UserAvatar name={message.user.name} avatar={message.user.avatar} />}

                  <div className={twMerge("flex flex-col gap-1 rounded-lg p-3 max-w-[75%]", message.senderId === user.id ? "bg-primary text-primary-foreground text-end" : "bg-muted text-start")}>
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

      {typing && (
        <span className="px-4 pb-2 text-sm text-muted-foreground shadow-sm">
          {message.user.name} is typing...
        </span>
      )}
    </>
  );
};

export default ChatContainer;
