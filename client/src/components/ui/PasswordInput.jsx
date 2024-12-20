import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import Input from './Input';

const PasswordInput = React.forwardRef(({ className = "", disabled = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={twMerge("relative flex items-center", className)}>
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-10"
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div onClick={toggleShowPassword} className={twMerge("absolute right-2 p-1 text-muted-foreground hover:bg-muted rounded-[4px] cursor-pointer", disabled && "select-none cursor-not-allowed opacity-50")}>
        {showPassword ? <EyeOff className="text-muted-foreground size-4" /> : <Eye className="text-muted-foreground size-4" />}
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PasswordInput;
