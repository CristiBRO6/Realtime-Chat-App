import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from '@/components/ui/Button';

const GoBack = ({ href = "", className = "", ...props }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={twMerge("flex justify-center items-center size-8 p-0 shadow-sm", className)}
      {...props}
      asChild={href !== ""}
    >
      {href ? (
        <Link to={href}>
          <ArrowLeft className="size-4" />
        </Link>
      ) : (
        <ArrowLeft className="size-4" />
      )}
    </Button>
  );
};

GoBack.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
};

export default GoBack;
