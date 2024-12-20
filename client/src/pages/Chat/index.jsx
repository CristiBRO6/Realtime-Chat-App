import { twMerge } from 'tailwind-merge';

import PageMeta from '@/layouts/PageMeta';
import Sidebar from '@/layouts/Sidebar';

import { useChatStore } from '@/stores/useChatStore';
import { useSidebarStore } from '@/stores/useSidebarStore';

import ChatProvider from '@/providers/ChatProvider';
import GlobalChatProvider from '@/providers/GlobalChatProvider';

import ChatContainer from '@/pages/Chat/ChatContainer';
import GlobalChatContainer from '@/pages/Chat/GlobalChatContainer';
import SendMessageForm from '@/pages/Chat/SendMessageForm';
import HeaderChat from '@/components/HeaderChat';

const Chat = () => {
  const { selectedUser } = useChatStore();
  const { open } = useSidebarStore();

  return (
    <>
      <PageMeta title={"Realtime Chat All"} description={"Realtime Chat All"} />

      {/* SIDEBAR */}
      <Sidebar />

      <div className={twMerge("flex-1 overflow-hidden md:flex flex-col", open ? "hidden" : "flex")}>
        {selectedUser  ? (
          <ChatProvider>
            {/* HEADER CHAT */}
            <HeaderChat />

            {/* CONTAINER CHAT */}
            <ChatContainer/>

            {/* FOOTER CHAT */}
            <SendMessageForm />
          </ChatProvider> 
        ) : (
          <GlobalChatProvider>
            {/* HEADER CHAT */}
            <HeaderChat />

            {/* CONTAINER CHAT */}
            <GlobalChatContainer />

            {/* FOOTER CHAT */}
            <SendMessageForm />
          </GlobalChatProvider>
        )}
      </div>
    </>
  )
}

export default Chat;