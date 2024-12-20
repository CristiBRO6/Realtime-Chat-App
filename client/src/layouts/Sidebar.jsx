import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { twMerge } from 'tailwind-merge';
import { EllipsisVertical, Hash, LogOut, Settings, Sun, User, UserCheck, Users, X } from 'lucide-react';

import ThemeModal from '@/layouts/ThemeModal';

import { useChatStore } from '@/stores/useChatStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSidebarStore } from '@/stores/useSidebarStore';

import useUser from '@/hooks/useUser';

import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSeparator, DropdownTrigger } from '@/components/ui/Dropdown';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { ScrollArea } from '@/components/ui/ScrollArea';
import Button from '@/components/ui/Button';
import Logout from '@/components/Logout';
import UserItem from '@/components/UserItem';
import UserAvatar from '@/components/UserAvatar';
import Search from '@/components/Search';

const Sidebar = () => {
  const { user } = useUser();
  const { getUsers, users, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { open, setOpen } = useSidebarStore();

  const [isLoading, setIsLoading] = useState(true);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        await getUsers();
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [getUsers]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleToggle = (value) => {
    if (value === 'online') {
      setFilter("online");
      setFilteredUsers(filteredUsers.filter((user) => onlineUsers.includes(user.id)));
    } else {
      setFilter("all");
      setFilteredUsers(filteredUsers);
    }
  };

  if (isLoading) return null;

  return (
    <div className={twMerge("flex-1 md:max-w-64 md:flex flex-col bg-background border-r", open ? "flex" : "hidden")}>
      <div className="h-16 w-full flex items-center justify-between px-4 border-b">
        <span className="text-xl font-bold">Chat App</span>
        <Button className="md:hidden" variant="ghost" onClick={() => setOpen(false)}>
          <X className="size-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 py-4 px-2">
        <Search filter={filter} onlineUsers={onlineUsers} users={users} setUsers={setFilteredUsers} />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold px-2 text-muted-foreground">Channels</span>
          <Button
            variant="ghost"
            className={twMerge('flex gap-1 w-full justify-start', selectedUser == null && 'active')}
            onClick={() => {
              setSelectedUser(null);
              setOpen(false);
            }}
          >
            <Hash className="size-4" />
            Global Chat
          </Button>
        </div>

        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-muted-foreground px-2">Users</span>
            <span className="text-xs text-muted-foreground">
              {onlineUsers.length - 1} online
            </span>
          </div>

          <ToggleGroup
            type="single"
            onValueChange={handleToggle}
            defaultValue="all"
          >
            <ToggleGroupItem
              value="all"
              aria-label="Toggle all users"
              className="w-1/2 h-8"
            >
              <Users className="size-4" />
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="online"
              aria-label="Toggle online users"
              className="w-1/2 h-8"
            >
              <UserCheck className="size-4" />
              Online
            </ToggleGroupItem>
          </ToggleGroup>

          {filteredUsers.length > 0 ? (
            <ScrollArea className="h-full flex flex-col">
              <div className="flex flex-col gap-2">
                {filteredUsers.map((user) => (
                  <UserItem
                    key={user.id}
                    user={user}
                    onlineUsers={onlineUsers}
                    onClick={() => {
                      setSelectedUser(user.id);
                      setOpen(false);
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <span className="block text-center text-sm font-semibold text-muted-foreground py-2">
              {filter === "all" ? "No user find" : "No user online"}
            </span>
          )}
        </div>
      </div>

      <div className="h-16 w-full flex items-center gap-2 px-4 border-t">
        <div className="relative">
          <UserAvatar name={user.name} avatar={user.avatar} />
          <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500" />
        </div>
        <span className="flex-1 text-sm font-medium truncate">{user.name}</span>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownTrigger>
          <DropdownContent placement="top">
            <DropdownGroup>
              <DropdownItem asChild>
                <Link to="/profile">
                  <User className="size-4" />
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem onClick={() => NiceModal.show(ThemeModal)}>
                <Sun className="size-4" />
                Theme
              </DropdownItem>
              <DropdownItem asChild>
                <Link to="/settings">
                  <Settings className="size-4" />
                  Settings
                </Link>
              </DropdownItem>
              <DropdownSeparator />
              <Logout>
                <DropdownItem danger asChild>
                  <Link to="/profile">
                    <LogOut className="size-4" />
                    Logout
                  </Link>
                </DropdownItem>
              </Logout>
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
