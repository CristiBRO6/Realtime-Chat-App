import { twMerge } from 'tailwind-merge';

import { ScrollArea } from '@/components/ui/ScrollArea';
import Skeleton from '@/components/ui/Skeleton';

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <ScrollArea className="flex-1 px-4 py-2">
      <div className="flex flex-col gap-4">
        {skeletonMessages.map((_, index) => (
          <div key={index} className={twMerge("flex items-end gap-2", index % 2 !== 0 ? "justify-end" : "justify-start")}>
            {index % 2 === 0 && <Skeleton className="size-8 rounded-full" />}

            <div className="max-w-[75%]">
              <Skeleton className="h-16 w-[200px] rounded-lg" />
            </div>

            {index % 2 !== 0 && <Skeleton className="size-8 rounded-full" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageSkeleton;