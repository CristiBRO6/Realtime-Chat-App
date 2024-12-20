import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';

export const AlertDialog = ({ children, ...props }) => {
  return (
    <RadixAlertDialog.Root {...props}>
      {children}
    </RadixAlertDialog.Root>
  )
};

export const AlertDialogTrigger = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <RadixAlertDialog.Trigger ref={ref} className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixAlertDialog.Trigger>
  );
});

export const AlertDialogCancel = ({ children, className = "", ...props }) => {
  return (
    <RadixAlertDialog.Cancel className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixAlertDialog.Cancel>
  )
};

export const AlertDialogAction = ({ children, className = "", ...props }) => {
  return (
    <RadixAlertDialog.Action className={twMerge("outline-none", className)} {...props}>
      {children}
    </RadixAlertDialog.Action>
  )
};

export const AlertDialogOverlay = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <RadixAlertDialog.Overlay
      ref={ref} 
      className={twMerge(
        "fixed inset-0 z-[501] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
});

export const AlertDialogContent = ({ children, className = "", ...props }) => {
  return (
    <RadixAlertDialog.Portal>
      <AlertDialogOverlay />
      <RadixAlertDialog.Content className={twMerge("fixed left-[50%] top-[50%] z-[501] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className)} {...props}>
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
};

export const AlertDialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};

export const AlertDialogTitle = ({ children, className = "", ...props }) => {
  return (
    <RadixAlertDialog.Title className={twMerge("text-lg font-semibold leading-none", className)} {...props}>
      {children}
    </RadixAlertDialog.Title>
  );
};

export const AlertDialogDescription = ({ children, className = "", ...props }) => {
  return (
    <RadixAlertDialog.Description className={twMerge("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </RadixAlertDialog.Description>
  );
};

AlertDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDialogTrigger.displayName = 'AlertDialogTrigger';
AlertDialogTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogAction.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogCancel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogOverlay.displayName = 'AlertDialogOverlay';
AlertDialogOverlay.propTypes = {
  className: PropTypes.string,
};

AlertDialogContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AlertDialogDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};