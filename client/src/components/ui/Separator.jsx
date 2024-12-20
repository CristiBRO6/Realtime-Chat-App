import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Separator = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div 
        className={twMerge("h-px w-full bg-gray-800", className)} 
        ref={ref}
        {...props} 
    />
  );
});

Separator.displayName = 'Separator';
Separator.propTypes = {
  className: PropTypes.string,
};

export default Separator;