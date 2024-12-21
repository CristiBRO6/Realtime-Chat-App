import PropTypes from 'prop-types';
import { twMerge } from "tailwind-merge";

import UserAvatar from '@/components/UserAvatar';
import Button from '@/components/ui/Button';

import { useChatStore } from "@/stores/useChatStore";

const UserItem = ({ user, onlineUsers, ...props }) => {
  const { selectedUser } = useChatStore();

  return (
    <Button 
      variant="ghost" 
      className={twMerge("w-full justify-start", selectedUser?.id === user.id ? "active" : null)} 
      {...props}
    >
      <div className="relative">
        <UserAvatar name={user.name} avatar={user.avatar} className="size-6" />
        <div className={twMerge(
          "absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 transition-colors",
          selectedUser?.id === user.id ? "ring-accent" : "ring-background",
          onlineUsers.includes(user.id) ? "bg-green-500" : "bg-muted-foreground"
        )} />
      </div>
      <span className="flex-1 text-left">{user.name}</span>
    </Button>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  onlineUsers: PropTypes.array,
};

export default UserItem;