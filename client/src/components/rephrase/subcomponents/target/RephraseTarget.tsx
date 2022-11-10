/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingRipple from 'src/components/general/loading-ripple';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { UiExpectedResponse } from 'src/types/store';
import useWindowIsFocused from 'src/utils/hooks/useWindowIsFocused';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';
import RephraseHint from '../RephraseHint';
import TargetActions from './subcomponents/TargetActions';
import TargetSelect from './subcomponents/TargetSelect';
import TargetTextArea from './subcomponents/TargetTextArea';
import TargetWordPopover from './subcomponents/TargetWordPopover';

/* ---------------------------- Shared Interfaces --------------------------- */
export interface TargetCaretIndexInfo {
  index: number;
  movementTriggeredBy: 'mouse' | 'keyboard';
}

/* ---------------------------- Styled components --------------------------- */

const Wrapper = styled('div')(
  () => `
  width: 100%;
  display: flex;
  align-content: stretch;
  align-items: stretch;
  position: relative;
  padding-bottom: 60px
  `
);

const Container = styled('div')(
  () => `
  padding: 0; 
  flex-grow: 1; 
  position: relative;
  display: flex; 
  `
);

const LoadingSpinnerContainer = styled('div')(
  () => `
  padding: 40px; 
  display: flex; 
  justify-content: center; 
  width: 100%; 
  `
);

const TargetActionContainer = styled('div')(
  () => `
  position: relative;
  width: 100%;
  `
);

/* -------------------------------------------------------------------------- */
/*                               RephraseTarget                               */
/* -------------------------------------------------------------------------- */

const RephraseTarget = () => {
  // FROM STORE
  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const moveCaret = useBoundStore((state) => state.moveCaret);
  const expectedResponse: UiExpectedResponse | null = useBoundStore(
    (state) => state.uiState.expectedResponse
  );
  const rephrasingOptions: string[] = useBoundStore(
    (state) => state.uiState.rephrasingOptions
  );
  const activeRephrasingToken = useBoundStore(
    (state) => state.uiState.activeRephrasingToken
  );
  const deselectText = useBoundStore((state) => state.deselectText);
  const serverStateName = useBoundStore((state) => state.serverState.stateName);

  // OTHER HOOKS
  const theme = useTheme();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [targetCaretIndex, setTargetCaretIndex] =
    useState<TargetCaretIndexInfo | null>(null);
  const [showTargetWordPopover, setShowTargetWordPopover] =
    useState<boolean>(false);
  const [targetTextAreaIsFocused, setTargetTextAreaIsFocused] = useState(false);
  const [popoverTargetRect, setPopoverTargetRect] = useState<DOMRect | null>(
    null
  );
  const [isTypingInTarget, setIsTypingInTarget] = useState<boolean>(false);
  const windowIsFocused = useWindowIsFocused();

  // UTILS
  const value = searchParams.get('source-value');
  const showLoadingSpinner = () => {
    if (expectedResponse) {
      return expectedResponse.endpoint === 'selectText';
    }
    if (
      serverStateName === 'processingInitialize' ||
      serverStateName === 'processingSelectText'
    ) {
      return true;
    }
    return false;
  };

  const showHint = () =>
    (expectedResponse && expectedResponse.endpoint === 'deselectText') ||
    !activeTextSelection;

  const resetToOriginalSelection = () => {
    if (value && activeTextSelection && originalTextSelection) {
      const newSourceValue = replaceCharactersBetween(
        value,
        originalTextSelection.value,
        activeTextSelection.startIndex,
        activeTextSelection.endIndex
      );
      setSearchParams({ 'source-value': newSourceValue });
      deselectText();
    }
  };

  const showTargetWordPopoverPreconditions =
    !(popoverTargetRect === null || showHint() || showLoadingSpinner()) &&
    !(expectedResponse === null && rephrasingOptions?.length === 0) &&
    !(
      expectedResponse &&
      expectedResponse.endpoint === 'selectWordingAlternative'
    );

  const isLoadingRephrasing =
    expectedResponse !== null &&
    (expectedResponse.endpoint === 'selectWordingAlternative' ||
      expectedResponse.endpoint === 'updateTargetText');

  // USE EFFECTS
  useEffect(() => {
    if (activeRephrasingToken && !isTypingInTarget) {
      moveCaret(activeRephrasingToken?.startIndex, activeRephrasingToken);
    }
  }, [activeRephrasingToken]);

  // RENDER
  return (
    <>
      <Wrapper>
        <Container>
          {showLoadingSpinner() ? (
            <LoadingSpinnerContainer>
              <LoadingSpinner
                size={26}
                color={theme.activeMode === 'light' ? '#d1d1d1' : '#3b3b3b'}
              />
            </LoadingSpinnerContainer>
          ) : (
            <>
              {showHint() ? (
                <>
                  {value && value.length > 0 && (
                    <RephraseHint
                      hideHint={false}
                      title='Switch to Rephrase Mode'
                      subtitle='Switch to Rephrase Mode to select a phrase. You can then rephrase it word by word.'
                    />
                  )}
                </>
              ) : (
                <TargetActionContainer ref={containerRef}>
                  <LoadingRipple hide={!isLoadingRephrasing} />

                  <TargetTextArea
                    textAreaRef={textAreaRef}
                    setTargetCaretIndex={setTargetCaretIndex}
                    setIsTypingInTarget={setIsTypingInTarget}
                    setTargetTextAreaIsFocused={setTargetTextAreaIsFocused}
                  />

                  <TargetSelect
                    targetCaretIndex={targetCaretIndex}
                    setPopoverTargetRect={setPopoverTargetRect}
                    showTargetWordPopover={showTargetWordPopover}
                    setShowTargetWordPopover={setShowTargetWordPopover}
                    resetToOriginalSelection={resetToOriginalSelection}
                    targetTextAreaIsFocused={targetTextAreaIsFocused}
                  />
                </TargetActionContainer>
              )}
            </>
          )}
        </Container>
        {!showHint() && !showLoadingSpinner() && (
          <TargetActions resetToOriginalSelection={resetToOriginalSelection} />
        )}
      </Wrapper>

      {showTargetWordPopoverPreconditions &&
        showTargetWordPopover &&
        windowIsFocused && (
          <TargetWordPopover
            popoverTargetRect={popoverTargetRect}
            setShowTargetWordPopover={setShowTargetWordPopover}
          />
        )}
    </>
  );
};

export default RephraseTarget;
