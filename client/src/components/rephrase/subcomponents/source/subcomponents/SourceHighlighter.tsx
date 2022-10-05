import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import highlightText from 'src/utils/highlightText';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoSentences from 'src/utils/splitIntoSentences';
import parse from 'html-react-parser';
import { useTheme } from '@emotion/react';

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
}

interface Highlight {
  startIndex: number;
  endIndex: number;
  type: 'appear' | 'disappear';
}

const SourceHighlighter = (props: SourceHighlighterProps) => {
  const { value, startIndex, endIndex } = props;
  const highlighterRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  useRephraseToolTextboxSize(value, highlighterRef);

  const [currentHighlight, setCurrentHighlight] = useState<Highlight>({
    startIndex,
    endIndex,
    type: 'appear',
  });

  useEffect(() => {
    if (startIndex === 0 && endIndex === 0) {
      setCurrentHighlight({
        startIndex: currentHighlight.startIndex,
        endIndex: currentHighlight.endIndex,
        type: 'disappear',
      });
    } else {
      setCurrentHighlight({
        startIndex: startIndex,
        endIndex: endIndex,
        type: 'appear',
      });
    }
  }, [startIndex, endIndex]);

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
          '#FFE6B6'
        )
      )}
    </Container>
  );
};

export default SourceHighlighter;
