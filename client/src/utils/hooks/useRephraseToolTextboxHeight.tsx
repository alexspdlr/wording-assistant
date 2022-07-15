import { useEffect } from 'react';
import calculateRephraseToolTextSize from '../calculateRephraseToolTextSize';
import useBreakpoint from './useBreakpoint';
import useWindowHeight from './useWindowSize';

const useRephraseToolTextboxHeight = (
  text: string,
  targetRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();

  useEffect(() => {
    if (targetRef && targetRef.current) {
      targetRef.current.style.height = 'auto';
      targetRef.current.style.height = `${targetRef.current.scrollHeight}px`;
      const textSize = calculateRephraseToolTextSize(
        activeBreakpoint,
        text ? text.length : 0
      );
      targetRef.current.style.fontSize = `${textSize.fontSize}px`;
      targetRef.current.style.lineHeight = `${textSize.lineHeight}px`;
    }
  }, [text, activeBreakpoint, windowHeight, targetRef]);
};

export default useRephraseToolTextboxHeight;
