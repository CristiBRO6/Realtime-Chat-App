import PropTypes from 'prop-types';
import React from 'react';
import { Slot, Slottable } from "@radix-ui/react-slot"
import { twMerge } from 'tailwind-merge';

import Spinner from '@/components/ui/Spinner';

const Button = React.forwardRef(({ 
  children = "", 
  variant = "default", 
  size = "default",
  icon: Icon, 
  iconPosition = "start", 
  loading = false, 
  loadingColor = "white",
  className = "", 
  disabled = false,
  asChild = false,
  ...props
}, ref) => {
  const buttonVariant = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 [&.active]:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 [&.active]:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 [&.active]:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent",
    link: "h-auto p-0 text-primary underline-offset-4 hover:underline [&.active]:underline",
  };

  const buttonSizes = {
    default: "h-9 px-3 py-2",
    sm: "h-8 px-2 py-1",
    lg: "h-10 px-4 py-3",
    icon: "min-h-9 h-9 max-h-9 min-w-9 w-9 max-w-9",
  };  

  const baseClasses = "flex items-center justify-center gap-2 w-fit whitespace-nowrap text-sm font-medium rounded-md transition-colors";
  const loadingClasses = loading && "select-none opacity-50";
  const disabledClasses = disabled && "disabled:select-none disabled:cursor-not-allowed disabled:opacity-50";

  const iconElement = Icon && <Icon className="size-4" />;

  const Comp = asChild ? Slot : "button";
  
  return (
    <Comp
      className={twMerge(baseClasses, buttonSizes[size], buttonVariant[variant], loadingClasses, disabledClasses, className)}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {iconPosition === "start" && (loading ? <Spinner color={loadingColor} /> : iconElement)}
      <Slottable>{children}</Slottable>
      {iconPosition === "end" && (loading ? <Spinner color={loadingColor} /> : iconElement)}
    </Comp>
  );
});

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.string,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  asChild: PropTypes.bool,
};

export default Button;
