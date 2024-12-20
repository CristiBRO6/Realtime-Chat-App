import { useAuthStore } from '@/stores/useAuthStore';

const useUser = () => {
  const user = useAuthStore();
  return user;
};

export default useUser;
