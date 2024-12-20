import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { Circle } from 'lucide-react';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

export const RadioGroup = forwardRef(({ className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Root
      className={twMerge("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});

export const RadioGroupItem = forwardRef(({ className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Item
      ref={ref}
      className={twMerge(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadixRadioGroup.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadixRadioGroup.Indicator>
    </RadixRadioGroup.Item>
  );
});

RadioGroup.displayName = RadixRadioGroup.Root.displayName;
RadioGroup.propTypes = {
  className: PropTypes.string,
};

RadioGroupItem.displayName = RadixRadioGroup.Item.displayName;
RadioGroupItem.propTypes = {
  className: PropTypes.string,
};