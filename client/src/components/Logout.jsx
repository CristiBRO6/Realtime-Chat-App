import PropTypes from 'prop-types';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

const Logout = ({ children, ...props }) => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const res = await logout();
      
      if (!res.data.status) toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    }
  };

  return (
    <div onClick={handleLogout} {...props}>
      {children}
    </div>
  );
};

Logout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Logout;