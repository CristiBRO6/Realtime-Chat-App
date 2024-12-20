import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';
import { X } from 'lucide-react';

import * as RadixDialog from '@radix-ui/react-dialog';

export const Dialog = ({ children, ...props }) => {
  return (
    <RadixDialog.Root {...props}>
      {children}
    </RadixDialog.Root>
  )
};

export const DialogTrigger = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <RadixDialog.Trigger ref={ref} className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixDialog.Trigger>
  );
});

export const DialogClose = ({ children, className = "", ...props }) => {
  return (
    <RadixDialog.Close className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixDialog.Close>
  )
};

export const DialogAction = ({ children, className = "", ...props }) => {
  return (
    <RadixDialog.Action className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixDialog.Action>
  )
};

export const DialogOverlay = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <RadixDialog.Overlay
      ref={ref} 
      className={twMerge(
        "fixed inset-0 z-[501] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
});

export const DialogContent = ({ children, className = "", ...props }) => {
  return (
    <RadixDialog.Portal>
      <DialogOverlay />
      <RadixDialog.Content className={twMerge("fixed left-[50%] top-[50%] z-[501] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className)} {...props}>
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="size-4" />
        </DialogClose>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

export const DialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className = "", ...props }) => {
  return (
    <RadixDialog.Title className={twMerge("text-lg font-semibold leading-none", className)} {...props}>
      {children}
    </RadixDialog.Title>
  );
};

export const DialogDescription = ({ children, className = "", ...props }) => {
  return (
    <RadixDialog.Description className={twMerge("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </RadixDialog.Description>
  );
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
};

DialogTrigger.displayName = 'DialogTrigger';
DialogTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogAction.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogClose.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogOverlay.displayName = 'DialogOverlay';
DialogOverlay.propTypes = {
  className: PropTypes.string,
};

DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};