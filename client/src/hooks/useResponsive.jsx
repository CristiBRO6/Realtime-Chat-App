import { useEffect, useState } from "react";

const useResponsive = (breakpoints) => {
  const getInitialIndex = () => {
    const width = window.innerWidth;
    const initialIndex = breakpoints.findIndex((bp) => width <= bp);
    return initialIndex === -1 ? breakpoints.length : initialIndex;
  };

  const [index, setIndex] = useState(getInitialIndex);

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      const newIndex = breakpoints.findIndex((bp) => width <= bp);
      setIndex(newIndex === -1 ? breakpoints.length : newIndex);
    };

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [breakpoints]);

  return index;
};

export default useResponsive;
