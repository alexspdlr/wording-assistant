import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import { delay } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import highlightText from 'src/utils/highlightText';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import wait from 'src/utils/wait';

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
    props.textSelected ? 0.45 : 1
  )}; 
  transition: color 200ms ease-in-out;
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
}

const SourceHighlighter = (props: SourceHighlighterProps) => {
  const { value } = props;

  /* ----------------------------- GET STORE DATA ----------------------------- */

  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );

  const startIndex =
    activeTextSelection?.startIndex !== (null || 0 || undefined)
      ? activeTextSelection.startIndex
      : null;
  const endIndex =
    activeTextSelection?.endIndex !== (null || 0 || undefined)
      ? activeTextSelection.endIndex
      : null;

  const highlighterRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  useRephraseToolTextboxSize(value, highlighterRef);

  const [delayedStartIndex, setDelayedStartIndex] = useState<number | null>(
    null
  );
  const [delayedEndIndex, setDelayedEndIndex] = useState<number | null>();

  useEffect(() => {
    const updateIndicesDelayed = async (delay: number) => {
      await wait(delay);
      setDelayedStartIndex(startIndex);
      setDelayedEndIndex(endIndex);
    };

    console.log('start index:', startIndex);
    console.log('end index:', endIndex);

    if (startIndex !== null && endIndex !== null && startIndex !== endIndex) {
      updateIndicesDelayed(0);
    } else {
      updateIndicesDelayed(300);
    }
  }, [startIndex, endIndex]);

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
              startIndex: delayedStartIndex || 0,
              endIndex: delayedEndIndex || 0,
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
