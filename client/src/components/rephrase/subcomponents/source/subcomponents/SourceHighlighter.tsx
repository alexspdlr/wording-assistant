import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import highlightText from 'src/utils/highlightText';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';

const Container = styled('div')(
  (defaultProps) => ` 
  position: absolute; 
  margin: 0px 60px 0px 0px;  
  padding: 28px 0px 0px 28px; 
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
  startIndex: number | null;
  endIndex: number | null;
}

const SourceHighlighter = (props: SourceHighlighterProps) => {
  const { value, startIndex, endIndex } = props;

  /* ----------------------------- GET STORE DATA ----------------------------- */
  const highlighterRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  useRephraseToolTextboxSize(value, highlighterRef);

  return (
    <Container ref={highlighterRef}>
      {parse(
        highlightText(
          value,
          [
            {
              startIndex: startIndex || 0,
              endIndex: endIndex || 0,
            },
          ],
          '#fee8c0',
          theme.palette.text.light
        )
      )}
    </Container>
  );
};

export default SourceHighlighter;
