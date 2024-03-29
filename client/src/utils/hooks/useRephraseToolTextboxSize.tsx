import { useEffect, useRef } from 'react';
import calculateRephraseToolTextSize from '../calculateRephraseToolTextSize';
import useBreakpoint from './useBreakpoint';
import useWindowHeight from './useWindowHeight';
import useWindowWidth from './useWindowWidth';

const useRephraseToolTextboxSize = (
  text: string,
  targetRef: React.MutableRefObject<HTMLElement | null>
) => {
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (targetRef && targetRef.current) {
      const textSize = calculateRephraseToolTextSize(
        activeBreakpoint,
        text ? text.length : 0
      );
      targetRef.current.style.height = `auto`;
      targetRef.current.style.fontSize = `${textSize.fontSize}px`;
      targetRef.current.style.lineHeight = `${textSize.lineHeight}px`;
      targetRef.current.style.height = `${targetRef.current.scrollHeight}px`;
    }
  }, [text, activeBreakpoint, windowHeight, targetRef, windowWidth]);
};

export default useRephraseToolTextboxSize;
