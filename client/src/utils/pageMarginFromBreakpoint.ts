import { Breakpoint } from '../types/breakpoint';

const pageMarginFromBreakpoint = (breakpoint: Breakpoint): number => {
  switch (breakpoint) {
    case '3XL':
      return 100;

    case '2XL':
      return 100;

    case 'XL':
      return 100;

    case 'L':
      return 70;

    case 'M':
      return 50;

    case 'S':
      return 30;

    case 'XS':
      return 20;

    case '2XS':
      return 15;

    default:
      return 0;
  }
};

export default pageMarginFromBreakpoint;
