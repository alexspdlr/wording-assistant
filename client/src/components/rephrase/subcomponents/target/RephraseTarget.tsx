import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { ActiveWorkerState } from 'src/types/socket';
import {
  ClientWorkerState,
  TextToken,
  UiExpectedResponse,
} from 'src/types/store';
import RephraseHint from '../RephraseHint';
import TargetSelect from './subcomponents/TargetSelect';
import TargetTextArea from './subcomponents/TargetTextArea';
import TargetWordPopover from './subcomponents/TargetWordPopover';
import _, { debounce } from 'lodash';
import { original } from 'immer';

const Wrapper = styled('div')(
  () => `
  width: 100%;
  display: flex;
  align-content: stretch;
  align-items: stretch;
  position: relative;
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
  const setActiveRephrasingToken = useBoundStore(
    (state) => state.setActiveRephrasingToken
  );
  const deselectText = useBoundStore((state) => state.deselectText);

  const showLoadingSpinner = () =>
    expectedResponse ? expectedResponse.endpoint === 'selectText' : false;
  const showHint = () =>
    (expectedResponse && expectedResponse.endpoint === 'deselectText') ||
    !activeTextSelection;

  useEffect(() => {
    if (activeRephrasingToken && !isTypingInTarget) {
      moveCursor(activeRephrasingToken?.startIndex, activeRephrasingToken);
    }
  }, [activeRephrasingToken]);

  const resetToOriginalSelection = () => {
    // Update source text area
    if (value && activeTextSelection) {
      const newSourceValue =
        value.substr(0, activeTextSelection.startIndex) +
        originalTextSelection?.value +
        value.substr(activeTextSelection.endIndex);

      setSearchParams({ 'source-value': newSourceValue });
      deselectText();
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          {showLoadingSpinner() ? (
            <div style={{ padding: '30px' }}>
              <LoadingSpinner />
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
                <>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <TargetTextArea
                      setTargetCursorIndex={setTargetCursorIndex}
                      setIsTypingInTarget={setIsTypingInTarget}
                    />

                    <TargetSelect
                      targetCursorIndex={targetCursorIndex}
                      setPopoverTargetRect={setPopoverTargetRect}
                      showTargetWordPopover={showTargetWordPopover}
                      setShowTargetWordPopover={setShowTargetWordPopover}
                      resetToOriginalSelection={resetToOriginalSelection}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </Wrapper>

      {!(popoverTargetRect === null || showHint() || showLoadingSpinner()) &&
        !(expectedResponse === null && rephrasingOptions?.length === 0) &&
        showTargetWordPopover && (
          <TargetWordPopover popoverTargetRect={popoverTargetRect} />
        )}
    </>
  );
};

export default RephraseTarget;
