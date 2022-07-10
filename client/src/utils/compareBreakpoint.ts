import { Breakpoint } from '../types/breakpoint';

const compareBreakpoint = (
  breakpoint: Breakpoint,
  comparison: '>' | '<',
  comparisonBreakpoint: Breakpoint
): boolean => {
  const breakpoints: Breakpoint[] = [
    '3XL',
    '2XL',
    'XL',
    'L',
    'M',
    'S',
    'XS',
    '2XS',
    '3XS',
  ];

  const breakpointIndex = breakpoints.indexOf(comparisonBreakpoint);

  if (comparison === '>') {
    return breakpoints.slice(0, breakpointIndex).includes(breakpoint);
  } else {
    return breakpoints.slice(breakpointIndex + 1).includes(breakpoint);
  }
};

export default compareBreakpoint;
