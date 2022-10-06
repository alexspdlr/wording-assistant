import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import highlightText from 'src/utils/highlightText';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';

const Container = styled('div')(
  (defaultProps) => ` 
  position: absolute; 
  margin: 0px 60px 0px 0px;  
  padding: 24px 0px 0px 36px; 
  flex-grow: 1;
  outline: none; 
  display: block;   
  z-index: 0;
  line-height: 0;  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
  font-weight: 400;
  white-space: pre-wrap; 
  overflow: visible;
  color: transparent; 
  -webkit-font-smoothing: antialiased; 
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;   
      `
);

interface SourceHighlighterProps {
  value: string;
  startIndex: number;
  endIndex: number;
  updateTextAreaSelection: (newStartIndex: number, newEndIndex: number) => void;
}

interface Highlight {
  startIndex: number;
  endIndex: number;
  type: 'appear' | 'disappear';
}

const SourceHighlighter = (props: SourceHighlighterProps) => {
  const { value, startIndex, endIndex, updateTextAreaSelection } = props;
  const highlighterRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  useRephraseToolTextboxSize(value, highlighterRef);

  const [currentHighlight, setCurrentHighlight] = useState<Highlight>({
    startIndex,
    endIndex,
    type: 'appear',
  });

  const getStartIndex = useCallback(() => startIndex, [startIndex]);
  const getEndIndex = useCallback(() => endIndex, [endIndex]);
  const getCurrentHighlightStartIndex = useCallback(
    () => currentHighlight.startIndex,
    [currentHighlight.startIndex]
  );

  const getCurrentHighlightEndIndex = useCallback(
    () => currentHighlight.endIndex,
    [currentHighlight.endIndex]
  );

  useEffect(() => {
    updateTextAreaSelection(
      getCurrentHighlightStartIndex(),
      getCurrentHighlightEndIndex()
    );

    if (getStartIndex() === 0 && getEndIndex() === 0) {
      setCurrentHighlight({
        startIndex: getCurrentHighlightStartIndex(),
        endIndex: getCurrentHighlightEndIndex(),
        type: 'disappear',
      });
    } else {
      setCurrentHighlight({
        startIndex: getStartIndex(),
        endIndex: getEndIndex(),
        type: 'appear',
      });
    }
  }, [
    getStartIndex,
    getEndIndex,
    getCurrentHighlightEndIndex,
    getCurrentHighlightStartIndex,
    updateTextAreaSelection,
  ]);

  return (
    <Container ref={highlighterRef}>
      {parse(
        highlightText(
          currentHighlight.type,
          value,
          [
            {
              startIndex: currentHighlight.startIndex,
              endIndex: currentHighlight.endIndex,
            },
          ],
          '#ffd485',
          theme.palette.text.light
        )
      )}
    </Container>
  );
};

export default SourceHighlighter;
