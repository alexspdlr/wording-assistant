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
import { TargetCaretIndexInfo } from '../RephraseTarget';
import _ from 'lodash';
import TargetOriginalSelection from './TargetOriginalSelection';
import useWindowIsFocused from 'src/utils/hooks/useWindowIsFocused';

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
  targetCaretIndex: TargetCaretIndexInfo | null;
  setPopoverTargetRect: Function;
  showTargetWordPopover: boolean;
  setShowTargetWordPopover: (show: boolean) => void;
  resetToOriginalSelection: () => void;
  targetTextAreaIsFocused: boolean;
}

const TargetSelect = (props: TargetSelectProps) => {
  const {
    targetCaretIndex,
    setPopoverTargetRect,
    showTargetWordPopover,
    setShowTargetWordPopover,
    resetToOriginalSelection,
    targetTextAreaIsFocused,
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
      targetCaretIndex || targetCaretIndex === 0
        ? splitWords.find(
            (word) =>
              word.kind === 'text' &&
              targetCaretIndex.index >= word.startIndex &&
              targetCaretIndex.index <= word.endIndex
          )
        : null;

    if (targetTextAreaIsFocused) {
      setActiveRephrasingToken(newSelectedWord || null);
    }

    const targetElementRect = document
      .getElementById('target-word-selected')
      ?.getBoundingClientRect();

    if (targetElementRect) {
      setPopoverTargetRect(targetElementRect);
    } else {
      setPopoverTargetRect(null);
    }

    if (targetCaretIndex?.movementTriggeredBy === 'mouse') {
      if (
        activeRephrasingToken === null ||
        !(
          targetCaretIndex.index >= activeRephrasingToken.startIndex &&
          targetCaretIndex.index <= activeRephrasingToken.endIndex
        )
      ) {
        setShowTargetWordPopover(true);
      } else {
        setShowTargetWordPopover(!showTargetWordPopover);
      }
    } else {
      if (targetCaretIndex?.index === newSelectedWord?.startIndex) {
        setShowTargetWordPopover(true);
      } else {
        setShowTargetWordPopover(false);
      }
    }
  }, [targetCaretIndex]);

  const windowIsFocused = useWindowIsFocused();
  useEffect(() => {
    if (!windowIsFocused) {
      setActiveRephrasingToken(null);
      setPopoverTargetRect(null);
      setShowTargetWordPopover(false);
    }
  }, [windowIsFocused]);

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
                  targetCaretIndex !== null &&
                  (targetCaretIndex.index || targetCaretIndex.index === 0
                    ? targetCaretIndex.index >= token.startIndex &&
                      targetCaretIndex.index <= token.endIndex
                    : false)
                }
                key={`token_${i}`}
                id={
                  targetCaretIndex !== null &&
                  (targetCaretIndex.index || targetCaretIndex.index === 0) &&
                  targetCaretIndex.index >= token.startIndex &&
                  targetCaretIndex.index <= token.endIndex
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
