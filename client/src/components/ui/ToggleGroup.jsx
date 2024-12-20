import PropTypes from "prop-types";
import { createContext, forwardRef, useContext } from "react";
import { twMerge } from "tailwind-merge";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

import { toggleVariants } from '@/constants/variants';

const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

export const ToggleGroup = forwardRef(
  ({ className, variant, size, children, ...props }, ref) => (
    <RadixToggleGroup.Root
      ref={ref}
      className={twMerge("flex items-center justify-center gap-2", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </RadixToggleGroup.Root>
  )
);

export const ToggleGroupItem = forwardRef(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);

    return (
      <RadixToggleGroup.Item
        ref={ref}
        className={twMerge(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </RadixToggleGroup.Item>
    );
  }
);

ToggleGroup.displayName = RadixToggleGroup.Root.displayName;
ToggleGroup.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "outline"]),
  size: PropTypes.oneOf(["default", "sm", "lg"]),
  children: PropTypes.node.isRequired,
};

ToggleGroupItem.displayName = RadixToggleGroup.Item.displayName;
ToggleGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outline"]),
  size: PropTypes.oneOf(["default", "sm", "lg"]),
};