import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import * as RadixLabel from '@radix-ui/react-label'

export const Label = forwardRef(({ className, ...props }, ref) => (
  <RadixLabel.Root
    ref={ref}
    className={twMerge("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));

Label.propTypes = {
  className: PropTypes.string,
}
Label.displayName = RadixLabel.Root.displayName;