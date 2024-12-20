import * as React from "react";
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={twMerge(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={twMerge("disabled:cursor-not-allowed", className)}
    {...props}
  />
));

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("flex items-center", className)} {...props} />
));

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});

const InputOTPSeparator = React.forwardRef((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));

InputOTP.displayName = "InputOTP";
InputOTP.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

InputOTPGroup.displayName = "InputOTPGroup";
InputOTPGroup.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
};

InputOTPSlot.displayName = "InputOTPSlot";
InputOTPSlot.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
};

InputOTPSeparator.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };