import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

import * as RadixScrollArea from '@radix-ui/react-scroll-area';

export const ScrollArea = forwardRef(({ children, className = "", ...props }, ref) => (
  <RadixScrollArea.Root
    ref={ref}
    className={twMerge("relative overflow-hidden", className)}
    {...props}
  >
    <RadixScrollArea.Viewport className="relative h-full w-full rounded-[inherit]">
      {children}
    </RadixScrollArea.Viewport>
    <ScrollBar />
    <RadixScrollArea.Corner />
  </RadixScrollArea.Root>
))

export const ScrollBar = forwardRef(({ className = "", orientation = "vertical", ...props }, ref) => (
  <RadixScrollArea.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={twMerge(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <RadixScrollArea.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </RadixScrollArea.ScrollAreaScrollbar>
))

ScrollArea.displayName = 'ScrollArea';
ScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ScrollBar.displayName = 'ScrollBar';
ScrollBar.propTypes = {
  orientation: PropTypes.string,
  className: PropTypes.string,
};