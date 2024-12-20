import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

import Input from './Input';

const SearchInput = React.forwardRef(({ className = "", value, onChange, disabled = false, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const clearInput = () => {
    if (!isControlled) setInternalValue('');
    if (onChange) onChange({ target: { value: '' } });
  };

  return (
    <div className={twMerge("relative flex items-center", className)}>
      <Search className={twMerge("absolute left-2 text-muted-foreground size-4", disabled && "select-none cursor-not-allowed opacity-50")} />
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={twMerge("pl-8", inputValue && "pr-10")}
        placeholder="Search..."
        disabled={disabled}
        ref={ref}
        {...props}
      />
      {inputValue && (
        <div onClick={clearInput} className={twMerge("absolute right-2 p-1 text-muted-foreground hover:bg-muted rounded-[4px] cursor-pointer", disabled && "select-none cursor-not-allowed opacity-50")}>
          <X className="size-4" />
        </div>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchInput;
