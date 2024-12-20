import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex flex-col bg-card text-card-foreground rounded-md shadow-sm border", className)} {...props}>
      {children}
    </div>
  )
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex flex-col p-4", className)} {...props}>
      {children}
    </div>
  )
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <span className={twMerge("text-xl font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </span>
  )
};

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <span className={twMerge("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </span>
  )
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("p-4 pt-0", className)} {...props}>
      {children}
    </div>
  )
};

export const CardFooter  = ({ children, className = "", ...props }) => {
  return (
    <div className={twMerge("flex items-center p-4 pt-0", className)} {...props}>
      {children}
    </div>
  )
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};