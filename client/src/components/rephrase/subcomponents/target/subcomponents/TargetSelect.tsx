import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import CustomPopover from 'src/components/Popover';
import useBoundStore from 'src/store';
import { TextToken } from 'src/types/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useSourceTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoWords from 'src/utils/splitIntoWords';
import { TargetCursorIndexInfo } from '../RephraseTarget';

const Container = styled('div')(
  () => `
  flex-grow: 1; 
  outline: none;
  display: block; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
  font-weight: 400;
  overflow: visible; 
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none; 
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
  width: 100%; 
  animation: fade 300ms;
  @keyframes fade {
    0% { opacity: 0; } 
    50% {opacity: 0.8;}
    100% { opacity: 1; }
  }

      `
);

interface WordProps {
  selected: boolean;
}

const Word = styled('span')(
  (props: WordProps) => (defaultProps) =>
    `
    position: relative; 
  padding-top: 2px; 
  padding-bottom: 2px; 
  border-top: 1px solid ${defaultProps.theme.palette.background.light};
  border-bottom: 1px solid ${defaultProps.theme.palette.background.light};
  white-space: pre-wrap;
  background-color:transparent; 
  color: transparent; 
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color;
  
  `
);

interface TargetSelectProps {
  value: string;
  targetCursorIndex: TargetCursorIndexInfo | null;
  setPopoverTargetRect: Function;
  setSelectedTextToken: (token: TextToken | null) => void;
  showTargetWordPopover: boolean;
  setShowTargetWordPopover: (show: boolean) => void;
}

const TargetSelect = (props: TargetSelectProps) => {
  const {
    value,
    targetCursorIndex,
    setPopoverTargetRect,
    setSelectedTextToken,
    showTargetWordPopover,
    setShowTargetWordPopover,
  } = props;
  const containerRef = useRef(null);
  useSourceTextboxSize(value, containerRef);
  const theme = useTheme();
  const uiState = useBoundStore((state) => state.uiState);

  useEffect(() => {
    const newSelectedWord =
      targetCursorIndex || targetCursorIndex === 0
        ? splitWords.find(
            (word) =>
              word.kind === 'text' &&
              targetCursorIndex.index >= word.startIndex &&
              targetCursorIndex.index <= word.endIndex
          )
        : null;

    setSelectedTextToken(newSelectedWord || null);

    const targetElementRect = document
      .getElementById('target-word-selected')
      ?.getBoundingClientRect();

    if (targetElementRect) {
      setPopoverTargetRect(targetElementRect);
    } else {
      setPopoverTargetRect(null);
    }

    if (targetCursorIndex?.movementTriggeredBy === 'mouse') {
      if (
        uiState.selectedTextToken === null ||
        !(
          targetCursorIndex.index >= uiState.selectedTextToken.startIndex &&
          targetCursorIndex.index <= uiState.selectedTextToken.endIndex
        )
      ) {
        setShowTargetWordPopover(true);
      } else {
        setShowTargetWordPopover(!showTargetWordPopover);
      }
    } else {
      if (targetCursorIndex?.index === newSelectedWord?.startIndex) {
        setShowTargetWordPopover(true);
      } else {
        setShowTargetWordPopover(false);
      }
    }
  }, [targetCursorIndex]);

  const splitWords = splitIntoWords(value);

  return (
    <>
      <Container ref={containerRef} tabIndex={0} id='target-select-container'>
        <div
          style={{
            padding: '28px 28px 14px 28px',
          }}
        >
          {splitWords.map((token, i) =>
            token.kind === 'text' ? (
              <Word
                selected={
                  targetCursorIndex !== null &&
                  (targetCursorIndex.index || targetCursorIndex.index === 0
                    ? targetCursorIndex.index >= token.startIndex &&
                      targetCursorIndex.index <= token.endIndex
                    : false)
                }
                key={`token_${i}`}
                id={
                  targetCursorIndex !== null &&
                  (targetCursorIndex.index || targetCursorIndex.index === 0) &&
                  targetCursorIndex.index >= token.startIndex &&
                  targetCursorIndex.index <= token.endIndex
                    ? `target-word-selected`
                    : `target-word-${i}`
                }
              >
                {token.value}
              </Word>
            ) : (
              <span key={`token_${i}`} style={{ whiteSpace: 'pre-wrap' }}>
                {token.value}
              </span>
            )
          )}
        </div>
        <div
          style={{
            margin: '0px 22px 0px 22px',
            padding: '10px 6px 0px 6px',
            color: '#888',
            fontSize: '21px',
            fontWeight: 300,
            position: 'relative',
            borderTop: `1px solid ${addAlphaToHexColor(
              theme.palette.border,
              0.6
            )}`,
          }}
        >
          Original: <>{JSON.stringify(targetCursorIndex)}</>
          <div
            style={{
              fontWeight: 400,
              color: theme.palette.text.main,
              position: 'absolute',
              zIndex: 50,
              paddingTop: '14px',
              cursor: 'pointer',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: 'calc(100% - 36px)',
            }}
          >
            {uiState.originalText}
          </div>
        </div>
      </Container>
    </>
  );
};

export default TargetSelect;
