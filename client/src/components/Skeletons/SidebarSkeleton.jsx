import { twMerge } from 'tailwind-merge';
import { EllipsisVertical, Hash, UserCheck, Users, X } from 'lucide-react';

import useUser from '@/hooks/useUser';

import { ScrollArea } from '@/components/ui/ScrollArea';
import Skeleton from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import UserAvatar from '@/components/UserAvatar';


const SidebarSkeleton = () => {
  const { user } = useUser();
  const skeletonSidebar = Array(6).fill(null);

  return (
    <div className={twMerge("flex-1 md:max-w-64 md:flex flex-col bg-background border-r", open ? "flex" : "hidden")}>
      <div className="h-16 w-full flex items-center justify-between px-4 border-b">
        <span className="text-xl font-bold">Chat App</span>
        <Button className="md:hidden" variant="ghost">
          <X className="size-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 py-4 px-2">
        <SearchInput placeholder="Search by name..." />
        
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold px-2 text-muted-foreground">Channels</span>
          <Button variant="ghost" className="flex gap-1 w-full justify-start" >
            <Hash className="size-4" />
            Global Chat
          </Button>
        </div>

        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-muted-foreground px-2">Users</span>
            <span className="text-xs text-muted-foreground">0 online</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="items-center w-1/2 h-8 active">
              <Users className="size-4" />
              All
            </Button>
            <Button variant="ghost" className="items-center w-1/2 h-8">
              <UserCheck className="size-4" />
              Online
            </Button>
          </div>

          <ScrollArea className="flex-1 flex flex-col">
            <div className="flex flex-col gap-2">
              {skeletonSidebar.map((_, index) => (
                <div key={index} className="h-9 w-full flex items-center justify-start gap-2 px-3 py-2">
                  <Skeleton className="rounded-full size-6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="h-16 w-full flex items-center gap-2 px-4 border-t">
        <div className="relative">
          <UserAvatar name={user.name} avatar={user.avatar} />
          <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500" />
        </div>
        <span className="flex-1 text-sm font-medium truncate">{user.name}</span>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarSkeleton;