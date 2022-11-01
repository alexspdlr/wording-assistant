import { Breakpoint } from 'src/types/breakpoint';
import { TextSize } from 'src/types/textSize';
import compareBreakpoint from './compareBreakpoint';

const calculateRephraseHintHeadingSize = (
  activeBreakpoint: Breakpoint
): TextSize => {
  if (compareBreakpoint(activeBreakpoint, '>', 'S')) {
    return {
      fontSize: 26,
      lineHeight: 32.5,
    };
  }

  if (compareBreakpoint(activeBreakpoint, '>', '2XS')) {
    return {
      fontSize: 24,
      lineHeight: 30,
    };
  }

  return {
    fontSize: 22,
    lineHeight: 24,
  };
};

export default calculateRephraseHintHeadingSize;
