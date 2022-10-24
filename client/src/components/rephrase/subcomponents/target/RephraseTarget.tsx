import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingRipple from 'src/components/general/loading-ripple';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { UiExpectedResponse } from 'src/types/store';
import useWindowHeight from 'src/utils/hooks/useWindowHeight';
import useWindowIsFocused from 'src/utils/hooks/useWindowIsFocused';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';
import RephraseHint from '../RephraseHint';
import TargetActions from './subcomponents/TargetActions';
import TargetSelect from './subcomponents/TargetSelect';
import TargetTextArea from './subcomponents/TargetTextArea';
import TargetWordPopover from './subcomponents/TargetWordPopover';

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

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => `
  padding: 0; 
  flex-grow: 1; 
  position: relative;
  display: flex; 
  `
);

export interface TargetCursorIndexInfo {
  index: number;
  movementTriggeredBy: 'mouse' | 'keyboard';
}

interface RephraseTargetProps {}

const RephraseTarget = (props: RephraseTargetProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );

  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const moveCursor = useBoundStore((state) => state.moveCursor);

  // maybe move these useStates into ui state !?
  const [targetCursorIndex, setTargetCursorIndex] =
    useState<TargetCursorIndexInfo | null>(null);
  const [showTargetWordPopover, setShowTargetWordPopover] =
    useState<boolean>(false);
  const [targetTextAreaIsFocused, setTargetTextAreaIsFocused] = useState(false);
  const [popoverTargetRect, setPopoverTargetRect] = useState<DOMRect | null>(
    null
  );
  const [isTypingInTarget, setIsTypingInTarget] = useState<boolean>(false);

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

  useEffect(() => {
    if (activeRephrasingToken && !isTypingInTarget) {
      console.log('active token _________:', activeRephrasingToken);
      moveCursor(activeRephrasingToken?.startIndex, activeRephrasingToken);
    }
  }, [activeRephrasingToken]);

  const resetToOriginalSelection = () => {
    // Update source text area
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
    !(expectedResponse === null && rephrasingOptions?.length === 0);

  const windowIsFocused = useWindowIsFocused();

  const loadingRephrasing =
    expectedResponse !== null &&
    (expectedResponse.endpoint === 'selectWordingAlternative' ||
      expectedResponse.endpoint === 'updateTargetText');

  const theme = useTheme();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Wrapper>
        <Container>
          {showLoadingSpinner() ? (
            <div
              style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <LoadingSpinner
                size={26}
                color={theme.activeMode === 'light' ? '#d1d1d1' : '#3b3b3b'}
              />
            </div>
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
                <div
                  ref={containerRef}
                  style={{
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <LoadingRipple hide={!loadingRephrasing} />

                  <TargetTextArea
                    textAreaRef={textAreaRef}
                    setTargetCursorIndex={setTargetCursorIndex}
                    setIsTypingInTarget={setIsTypingInTarget}
                    setTargetTextAreaIsFocused={setTargetTextAreaIsFocused}
                  />

                  <TargetSelect
                    targetCursorIndex={targetCursorIndex}
                    setPopoverTargetRect={setPopoverTargetRect}
                    showTargetWordPopover={showTargetWordPopover}
                    setShowTargetWordPopover={setShowTargetWordPopover}
                    resetToOriginalSelection={resetToOriginalSelection}
                    targetTextAreaIsFocused={targetTextAreaIsFocused}
                  />
                </div>
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
