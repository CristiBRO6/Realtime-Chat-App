import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import { getUserInitials } from '@/utils/userUtils';

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

const UserAvatar = ({ name, avatar, className = "", ...props }) => (
  <Avatar className={twMerge("size-8", className)} {...props}>
    <AvatarImage src={avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
    <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
  </Avatar>
);

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  className: PropTypes.string,
};

export default UserAvatar;