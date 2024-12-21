import { Hash, Users  } from "lucide-react";

import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";

import UserAvatar from "@/components/UserAvatar";
import GoBack from "@/components/GoBack";

const HeaderChat = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { setOpen } = useSidebarStore();

  return (
    <div className="h-16 w-full flex items-center gap-2 px-4 border-b">
      <GoBack className="md:hidden" onClick={() => setOpen(true)} />

      {selectedUser ? (
        <>
          <UserAvatar name={selectedUser.name} avatar={selectedUser.avatar} />
          <span className="flex-1 text-lg font-semibold">{selectedUser.name}</span>
        </>
      ) : (
        <>
          <Hash className="size-4 text-muted-foreground" />
          <h2 className="flex-1 text-lg font-semibold">Global Chat</h2>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{onlineUsers.length} online</span>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderChat;