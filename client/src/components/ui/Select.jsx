import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import * as RadixSelect from '@radix-ui/react-select';

const contentClasses = "relative z-[501] max-h-96 min-w-32 p-1 bg-background text-foregound border rounded-md shadow-sm transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const Select = ({ children, ...props }) => {
  return (
    <RadixSelect.Root {...props}>
      {children}
    </RadixSelect.Root>
  );
};

export const SelectTrigger = ({ children, className = "", ...props }) => {
  return (
    <RadixSelect.Trigger className={twMerge("flex items-center justify-between gap-2 w-fit h-9 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md border hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent outline-none disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
      {children}
      <ChevronDown className="size-4 opacity-50" />
    </RadixSelect.Trigger>
  );
};

export const SelectValue = ({ placeholder, ...props }) => {
  return (
    <RadixSelect.Value placeholder={placeholder} {...props} />
  );
};

export const SelectIcon = ({ children, ...props }) => {
  return (
    <RadixSelect.Icon {...props}>
      {children}  
    </RadixSelect.Icon>
  );
};

export const SelectContent = ({ children, position = "popper", className = "", ...props }) => {
  return (
    <RadixSelect.Content position={position} className={twMerge(contentClasses, position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className)} {...props}>
      {children}
    </RadixSelect.Content>
  );
};

export const SelectGroup = ({ children, className = "", ...props }) => {
  return (
    <RadixSelect.Group className={twMerge("flex flex-col gap-1", className)} {...props}>
      {children}
    </RadixSelect.Group>
  );
};

export const SelectLabel = ({ children, className = "", ...props }) => {
  return (
    <RadixSelect.Label className={twMerge("px-8 py-1 text-sm font-semibold text-popover-foreground", className)} {...props}>
      {children}
    </RadixSelect.Label>
  );
};

export const SelectItem = forwardRef(({ children = "", danger = false, className = "", ...props }, ref) => {
  const dangerClasses = danger && "hover:bg-destructive/10 text-destructive";

  return (
    <RadixSelect.Item className={twMerge("w-full flex items-center gap-2 px-2 data-[state=unchecked]:px-8 py-1 text-sm font-medium rounded-md cursor-default transition-colors duration-300 hover:bg-accent data-[state=checked]:bg-accent outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className, dangerClasses)} {...props} ref={ref}>
      <RadixSelect.ItemIndicator>
        <Check className="size-4" />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

export const SelectSeparator = () => {
  return <RadixSelect.Separator className="-mx-1 h-px bg-border" />;
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SelectTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SelectValue.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

SelectIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

SelectContent.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
  className: PropTypes.string,
};

SelectLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SelectGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SelectItem.displayName = 'SelectItem';
SelectItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  danger: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
