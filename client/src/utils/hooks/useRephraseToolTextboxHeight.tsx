import { useEffect, useRef } from 'react';
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
      console.log('scrollheight: ', targetRef.current?.scrollHeight);
    }
  }, [targetRef, targetRef.current?.scrollHeight]);

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

      console.log(
        'targetRef.current.style.height: ',
        targetRef.current.style.height
      );
    }
  }, [text, activeBreakpoint, windowHeight, targetRef]);
};

export default useRephraseToolTextboxHeight;
