import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = ({ children, className = "", ...props }) => {
  return (
    <RadixTabs.Root className={twMerge("flex flex-col", className)} {...props}>
        {children}
    </RadixTabs.Root>
  );
}

export const TabsList = ({ children, className = "", ...props }) => {
  return (
    <RadixTabs.List className={twMerge("w-full md:w-fit h-10 flex items-center justify-center gap-1 rounded-md bg-muted p-1 text-muted-foreground", className)} {...props}>
      {children}
    </RadixTabs.List>
  );
}

export const TabsTrigger = ({ children, className = "", ...props }) => {
  return (
    <RadixTabs.Trigger 
      className={twMerge(
        "w-full md:w-fit flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", 
        className)}
      {...props}
      >
      {children}
    </RadixTabs.Trigger>
  );
}

export const TabsContent = ({ children, className = "", ...props }) => {
  return (
    <RadixTabs.Content className={twMerge("data-[state=active]:mt-2 focus-visible:outline-none", className)} {...props}>
      {children}
    </RadixTabs.Content>
  );
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TabsTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TabsContent.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};
