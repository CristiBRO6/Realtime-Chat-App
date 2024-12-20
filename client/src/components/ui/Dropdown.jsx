import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

import * as RadixDropdown from '@radix-ui/react-dropdown-menu';

import Logout from '@/components/Logout';

import { ScrollArea } from '@/components/ui/ScrollArea';

const contentClasses = "relative z-[501] overflow-hidden m-1 bg-background text-foregound border rounded-md shadow-sm";
const animationClasses = "transition-all data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const Dropdown = ({ children, ...props }) => {
  return (
    <RadixDropdown.Root {...props}>
      {children}
    </RadixDropdown.Root>
  );
};

export const DropdownTrigger = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <RadixDropdown.Trigger ref={ref} className={twMerge("w-fit outline-none disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
      {children}
    </RadixDropdown.Trigger>
  );
});

export const DropdownContent = ({ children, placement = "bottom", align = "center", className = "", ...props }) => {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content side={placement} align={align} className={twMerge(contentClasses, animationClasses, className)} {...props}>
        <ScrollArea className="flex flex-col max-h-96 min-w-32 p-1">
          {children}
        </ScrollArea>
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
};

export const DropdownGroup = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
};

export const DropdownLabel = ({ children }) => {
  return <RadixDropdown.Label className="pl-2 py-1 text-sm font-semibold text-popover-foreground">{children}</RadixDropdown.Label>
};

export const DropdownItems = ({ items }) => {
  return (
    <DropdownGroup>
      {items.map(item => (
          item.type === "item" ? (
            <DropdownItem key={item.id} danger={item.danger} asChild>
              <Link to={item.path}>
                {item.icon && <item.icon className="size-4" />}
                {item.name}
              </Link>
            </DropdownItem>
          ) : item.type === "logout" ? (
            <Logout key={item.id}>
              <DropdownItem danger={item.danger}>
                {item.icon && <item.icon className="size-4" />}
                {item.name}
              </DropdownItem>
            </Logout>
          ) : item.type === "separator" ? (
            <DropdownSeparator key={item.id} />
          ) : item.type === "group" ? (
            <Dropdown key={item.id}>
              <DropdownTrigger className="w-full">
                <DropdownItem>
                  {item.icon && <item.icon className="size-4" />}
                  {item.name}
                </DropdownItem>
              </DropdownTrigger>
              <DropdownContent placement={item.placement} align={item.align}>
                <DropdownGroup>
                  <DropdownItems items={item.children} />
                </DropdownGroup>
              </DropdownContent>
            </Dropdown>
          ) : null
        ))}
    </DropdownGroup>
  );
};

export const DropdownItem = ({ children, danger = false, className = "", ...props }) => {
  const dangerClasses = danger && "hover:bg-destructive/10 text-destructive";

  return (
    <RadixDropdown.Item
      className={twMerge("flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-md cursor-pointer transition-colors duration-300 hover:bg-accent [&.active]:bg-accent outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className, dangerClasses)}
      {...props}
    >
      {children}
    </RadixDropdown.Item>
  );
};

export const DropdownSeparator = () => {
  return <RadixDropdown.Separator className="-mx-1 h-px bg-border" />;
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

DropdownTrigger.displayName = 'DropdownTrigger';
DropdownTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownContent.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
};

DropdownGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  className: PropTypes.string,
};

DropdownItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.any,
      path: PropTypes.string,
      danger: PropTypes.bool,
      theme: PropTypes.string,
      placement: PropTypes.string,
      align: PropTypes.string,
      children: PropTypes.array,
    })
  ).isRequired,
};
