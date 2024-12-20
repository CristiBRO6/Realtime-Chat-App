import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import React from 'react';

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      className={twMerge(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border focus-visible:border-primary focus-visible:shadow-[0px_0px_1px_0px_var(--color-primary)] disabled:select-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
