import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import * as RadixAvatar from "@radix-ui/react-avatar"

export const Avatar = ({ children, className = "", ...props }) => {
  return (
    <RadixAvatar.Root className={twMerge("relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)} {...props}>
      {children}
    </RadixAvatar.Root>
  );
};

export const AvatarImage = ({ className = "", ...props }) => {
  return (
    <RadixAvatar.Image className={twMerge("aspect-square h-full w-full", className)} {...props} />
  );
};

export const AvatarFallback = ({ children, className = "", ...props }) => {
  return (
    <RadixAvatar.Fallback className={twMerge("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props}>
      {children}
    </RadixAvatar.Fallback>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AvatarImage.propTypes = {
  className: PropTypes.string,
};

AvatarFallback.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
