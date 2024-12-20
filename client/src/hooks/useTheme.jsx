import { useThemeStore } from '@/stores/useThemeStore';

const useTheme = () => {
  const theme = useThemeStore();
  return theme;
};

export default useTheme;
