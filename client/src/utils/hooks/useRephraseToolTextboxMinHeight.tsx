import { useEffect, useState } from 'react';
import compareBreakpoint from '../compareBreakpoint';
import useBreakpoint from './useBreakpoint';
import useWindowHeight from './useWindowSize';

const useRephraseToolTextboxMinHeight = () => {
  const [minHeight, setMinHeight] = useState('auto');
  const activeBreakpoint = useBreakpoint();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const windowHeight = useWindowHeight();

  useEffect(() => {
    if (isMobileLayout) setMinHeight('17vh');
    else if (windowHeight > 960) setMinHeight('528px');
    else setMinHeight('55vh');
  }, [windowHeight, isMobileLayout]);

  return minHeight;
};

export default useRephraseToolTextboxMinHeight;
