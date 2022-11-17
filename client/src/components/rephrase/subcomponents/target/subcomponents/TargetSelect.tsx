/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import useBoundStore from 'src/store';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import useWindowIsFocused from 'src/utils/hooks/useWindowIsFocused';
import splitIntoWords from 'src/utils/splitIntoWords';
import { TargetCaretIndexInfo } from '../RephraseTarget';
import TargetOriginalSelection from './TargetOriginalSelection';

/* ---------------------------- Styled components --------------------------- */

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

const PositionedText = styled('div')(
  () => `
  padding: 28px 28px 14px 28px;
      `
);

const Text = styled('span')(
  (defaultProps) =>
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

const NonText = styled('span')(
  () =>
    `
    white-space: pre-wrap;
    color: transparent;
  `
);

/* -------------------------------------------------------------------------- */
/*                                TargetSelect                                */
/* -------------------------------------------------------------------------- */

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

  // FROM STORE
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

  // UTILS
  const splitWords = splitIntoWords(activeTextSelection?.value || '');

  // OTHER HOOKS
  const containerRef = useRef<HTMLDivElement | null>(null);
  useRephraseToolTextboxSize(activeTextSelection?.value || '', containerRef);
  const windowIsFocused = useWindowIsFocused();

  // USE EFFECTS
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

  useEffect(() => {
    if (!windowIsFocused) {
      setActiveRephrasingToken(null);
      setPopoverTargetRect(null);
      setShowTargetWordPopover(false);
    }
  }, [windowIsFocused]);

  // RENDER
  return (
    <>
      <Container ref={containerRef} tabIndex={0} id='target-select-container'>
        <PositionedText
          style={{
            padding: '28px 28px 14px 28px',
          }}
        >
          {splitWords.map((token, i) =>
            token.kind === 'text' ? (
              <Text
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
              <NonText key={`token_${i}`}>{token.value}</NonText>
            )
          )}
        </PositionedText>
        <TargetOriginalSelection
          hide={_.isEqual(originalTextSelection, activeTextSelection)}
          resetToOriginalSelection={resetToOriginalSelection}
        />
      </Container>
    </>
  );
};

export default TargetSelect;
