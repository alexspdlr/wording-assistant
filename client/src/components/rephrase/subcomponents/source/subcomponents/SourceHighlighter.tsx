import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import highlightText from 'src/utils/highlightText';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';

interface ContainerProps {
  textSelected: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    ` 
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
  color: ${addAlphaToHexColor(
    defaultProps.theme.palette.text.light,
    props.textSelected ? 0.4 : 1
  )}; 
  transition: color 300ms ease-in-out, background-color 00ms ease-in-out;
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
    <Container
      ref={highlighterRef}
      textSelected={
        startIndex !== null && endIndex !== null && startIndex !== endIndex
      }
    >
      {parse(
        highlightText(
          value,
          [
            {
              startIndex: startIndex || 0,
              endIndex: endIndex || 0,
            },
          ],
          'transparent',
          theme.palette.primary.main
        )
      )}
    </Container>
  );
};

export default SourceHighlighter;
