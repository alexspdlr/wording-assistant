import { useState, useEffect } from 'react';
import { Breakpoint } from '../../types/breakpoint';

const breakpointFromWidth = (width: number): Breakpoint => {
  switch (true) {
    case width > 2000:
      return '3XL';

    case 2000 >= width && width > 1600:
      return '2XL';

    case 1600 >= width && width > 1400:
      return 'XL';

    case 1400 >= width && width > 1200:
      return 'L';

    case 1200 >= width && width > 1000:
      return 'M';

    case 1000 >= width && width > 840:
      return 'S';

    case 840 >= width && width > 650:
      return 'XS';

    case 650 >= width && width > 300:
      return '2XS';

    default:
      return '3XS';
  }
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(window.innerWidth);
  const resize = () => {
    setBreakpoint(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return breakpointFromWidth(breakpoint);
};

export default useBreakpoint;
