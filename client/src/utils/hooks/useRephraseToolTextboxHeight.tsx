import { useEffect } from 'react';
import calculateRephraseToolTextSize from '../calculateRephraseToolTextSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from './useBreakpoint';
import useWindowHeight from './useWindowSize';

const useRephraseToolTextboxHeight = (
  text: string,
  targetRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');

  const minHeight = () => {
    if (isMobileLayout) return '17vh';
    if (windowHeight > 990) return '439px';
    return '45vh';
  };

  useEffect(() => {
    if (targetRef && targetRef.current) {
      targetRef.current.style.minHeight = minHeight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
