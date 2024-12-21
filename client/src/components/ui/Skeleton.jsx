import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
  return (
    <div className={twMerge("animate-pulse rounded-md bg-muted", className)} {...props} />
  )
}

Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;