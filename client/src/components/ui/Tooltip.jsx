import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import * as RadixTooltip from "@radix-ui/react-tooltip";

export const TooltipProvider = RadixTooltip.Provider;

export const Tooltip = forwardRef(({ children, delayDuration = 500, ...props }, ref) => {
  return (
    <RadixTooltip.Root ref={ref} delayDuration={delayDuration} {...props}>
      {children}
    </RadixTooltip.Root>
  );
});

export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent  = forwardRef(({ children, sideOffset = 4, className = "", ...props }, ref) => {
  const baseClasses = "z-[501] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

  return (
    <RadixTooltip.Content ref={ref} sideOffset={sideOffset} className={twMerge(baseClasses, className)} {...props}>
      {children}
    </RadixTooltip.Content>
  );
});

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  delayDuration: PropTypes.number,
};

TooltipContent.displayName = 'TooltipContent';
TooltipContent.propTypes = {
  children: PropTypes.node.isRequired,
  sideOffset: PropTypes.number,
  className: PropTypes.string,
};

export default Tooltip;
