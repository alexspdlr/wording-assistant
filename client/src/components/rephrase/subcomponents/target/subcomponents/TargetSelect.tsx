import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import CustomPopover from 'src/components/Popover';
import useBoundStore from 'src/store';
import { TextToken } from 'src/types/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import useSourceTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoWords from 'src/utils/splitIntoWords';
import { TargetCursorIndexInfo } from '../RephraseTarget';
import _ from 'lodash';
import TargetOriginalSelection from './TargetOriginalSelection';

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

interface TextProps {
  selected: boolean;
}

const Text = styled('span')(
  (props: TextProps) => (defaultProps) =>
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
  targetCursorIndex: TargetCursorIndexInfo | null;
  setPopoverTargetRect: Function;
  showTargetWordPopover: boolean;
  setShowTargetWordPopover: (show: boolean) => void;
  resetToOriginalSelection: () => void;
}

const TargetSelect = (props: TargetSelectProps) => {
  const {
    targetCursorIndex,
    setPopoverTargetRect,
    showTargetWordPopover,
    setShowTargetWordPopover,
    resetToOriginalSelection,
  } = props;
  /* --------------------------- GET DATA FROM STORE -------------------------- */

  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const activeRephrasingToken = useBoundStore(
    (state) => state.uiState.activeRephrasingToken
  );
  const setActiveRephrasingToken = useBoundStore(
    (state) => state.setActiveRephrasingToken
  );

  /* ---------------------------------- UTILS --------------------------------- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  useRephraseToolTextboxSize(activeTextSelection?.value || '', containerRef);

  const theme = useTheme();

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

    setActiveRephrasingToken(newSelectedWord || null);

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
        activeRephrasingToken === null ||
        !(
          targetCursorIndex.index >= activeRephrasingToken.startIndex &&
          targetCursorIndex.index <= activeRephrasingToken.endIndex
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

  const splitWords = splitIntoWords(activeTextSelection?.value || '');

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
              <Text
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
              </Text>
            ) : (
              <span
                key={`token_${i}`}
                style={{ whiteSpace: 'pre-wrap', color: 'transparent' }}
              >
                {token.value}
              </span>
            )
          )}
        </div>
        <TargetOriginalSelection
          hide={_.isEqual(originalTextSelection, activeTextSelection)}
          resetToOriginalSelection={resetToOriginalSelection}
        />
      </Container>
    </>
  );
};

export default TargetSelect;
