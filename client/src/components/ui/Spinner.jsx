import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { LoaderCircle } from 'lucide-react';

const Spinner = ({ color = "primary", size = "medium", ...props }) => {
  const spinnerColors = {
    primary: "text-primary",
    white: "text-white",
    black: "text-black",
  };  

  const spinnerSize = {
    tiny: "size-3",  
    small: "size-4",
    medium: "size-5",
    large: "size-6",
    xl: "size-8",
    xxl: "size-10",
  }

  return (
    <LoaderCircle className={twMerge("inline animate-spin", spinnerColors[color], spinnerSize[size])} {...props} />
  )
}

Spinner.propTypes = {
  color: PropTypes.oneOf(["primary", "white", "black"]),
  size: PropTypes.oneOf(["tiny", "small", "medium", "large", "xl", "xxl"]),
};

export default Spinner;