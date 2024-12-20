import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import * as RadixToggle from '@radix-ui/react-toggle';

import { toggleVariants } from '@/constants/variants';

export const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <RadixToggle.Root
      ref={ref}
      className={twMerge(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Toggle.displayName = RadixToggle.Root.displayName;
Toggle.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outline']),
  size: PropTypes.oneOf(['default', 'sm', 'lg']),
};