import PropTypes from "prop-types";
import { useEffect } from 'react';

import useTheme from '@/hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.add("no-transition");
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    setTimeout(() => {
      root.classList.remove("no-transition");
    }, 0);
    
  }, [theme]);

  return <>{children}</>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
