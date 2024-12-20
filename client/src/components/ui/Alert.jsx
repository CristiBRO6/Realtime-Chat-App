import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { CircleCheck, CircleX, Info, Shield, TriangleAlert, X } from 'lucide-react';

const Alert = ({ children, type = "default", icon = true, closable = false, className = "", ...props }) => {
  const [isVisible, setIsVisible] = useState(true);

  if(!isVisible) return null;

  const alertTypes = {
    success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20",
    error: "bg-red-50 text-red-700 border-red-200 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-400/10 dark:text-yellow-400 dark:border-yellow-400/20",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20",
    default: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
  };

  const closableTypes = {
    success: "hover:bg-green-100 hover:dark:bg-green-400/10",
    error: "hover:bg-red-100 hover:dark:bg-red-400/10",
    warning: "hover:bg-yellow-100 hover:dark:bg-yellow-400/10",
    info: "hover:bg-blue-100 hover:dark:bg-blue-400/10",
    default: "hover:bg-gray-100 hover:dark:bg-gray-400/10",
  }

  const icons = {
    error: CircleX,
    success: CircleCheck,
    warning: TriangleAlert,
    info: Info,
    default: Shield,
  };

  const baseClasses = "flex items-start gap-2 p-3 rounded-md border";
  const Icon = icons[type];

  return (
    <div className={twMerge(baseClasses, alertTypes[type], className)} {...props}>
      {icon && <Icon className="min-h-4 h-4 max-h-4 min-w-4 w-4 max-w-4" />}
      <div className="flex-1 font-medium text-sm leading-none">{children}</div>
      {closable && (
        <div className={twMerge("p-1 rounded-[4px] cursor-pointer -my-1 -mr-1", closableTypes[type])} onClick={() => setIsVisible(false)}> 
          <X className="size-4" />
        </div>
      )}
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["success", "error", "warning", "info", "default"]),
  icon: PropTypes.bool,
  closable: PropTypes.bool,
  className: PropTypes.string,
};

export default Alert;