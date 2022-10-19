import styled from '@emotion/styled';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingRipple from 'src/components/general/loading-ripple';
import useBoundStore from 'src/store';
import useIsTyping from 'src/utils/hooks/useIsTyping';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';
import { TargetCursorIndexInfo } from '../RephraseTarget';

interface TextAreaProps {}

const TextArea = styled('textarea')(
  (props: TextAreaProps) => (defaultProps) =>
    `   
    position: absolute; 
    z-index: 2; 
    width: calc(100% - 56px);
    flex-grow: 1;  
    border: none;  
    outline: none;  
    display: block; 
    resize: none; 
    background-color: transparent; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400; 
    overflow: visible;
    margin: 0px 0px 0px 0px;  
    padding: 28px 28px 0px 28px;  
    -webkit-font-smoothing: antialiased; 
    line-height: 0;
    color: ${defaultProps.theme.palette.text.light}; 
    transition: color 300ms ease-in-out;
    ::selection{
      background-color: #ffe4b3;  
    } 
    `
);

interface TargetTextAreaProps {
  setTargetCursorIndex: (target: TargetCursorIndexInfo | null) => void;
  setIsTypingInTarget: (bool: boolean) => void;
  setTargetTextAreaIsFocused: (bool: boolean) => void;
}

const TargetTextArea = (props: TargetTextAreaProps) => {
  const {
    setTargetCursorIndex,
    setIsTypingInTarget,
    setTargetTextAreaIsFocused,
  } = props;

  /* ----------------------- GET DATA FROM SEARCH PARAMS ---------------------- */

  const [searchParams, setSearchParams] = useSearchParams();
  const sourceValue = searchParams.get('source-value');

  /* --------------------------- GET DATA FROM STORE -------------------------- */

  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const setActiveTextSelection = useBoundStore(
    (state) => state.setActiveTextSelection
  );
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const expectedResponse = useBoundStore(
    (state) => state.uiState.expectedResponse
  );
  const updateTargetText = useBoundStore((state) => state.updateTargetText);

  /* ---------------------------------- UTILS --------------------------------- */

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isTyping, register] = useIsTyping();
  useEffect(() => {
    if (textareaRef.current) register(textareaRef.current);
  }, [textareaRef.current]);

  useEffect(() => {
    setIsTypingInTarget(isTyping);
  }, [isTyping]);

  useRephraseToolTextboxSize(activeTextSelection?.value || '', textareaRef);

  const calculateMinHeight = () => {
    const viewportHeight = window.innerHeight;

    const margin = 60;

    const maxHeight = 490 - margin;
    const minHeight = 300 - margin;

    let targetHeight = viewportHeight * 0.5 - margin;

    if (targetHeight > maxHeight) {
      targetHeight = maxHeight;
    }

    if (targetHeight < minHeight) {
      targetHeight = minHeight;
    }

    return `${targetHeight}px`;
  };

  const updateTargetTextMemoized = useCallback(
    debounce((value, startIndex, endIndex) => {
      updateTargetText({
        value,
        startIndex,
        endIndex,
      });
    }, 500),
    []
  );

  return (
    <TextArea
      id='target-value-input'
      ref={textareaRef}
      value={activeTextSelection?.value || ''}
      disabled={!activeTextSelection}
      onFocus={() => setTargetTextAreaIsFocused(true)}
      onBlur={() => setTargetTextAreaIsFocused(false)}
      onChange={(e) => {
        if (originalTextSelection) {
          setActiveTextSelection({
            startIndex: originalTextSelection.startIndex,
            endIndex: originalTextSelection.startIndex + e.target.value.length,
            value: e.target.value,
          });

          updateTargetTextMemoized(
            e.target.value,
            originalTextSelection.startIndex,
            originalTextSelection.startIndex + e.target.value.length
          );
        }
      }}
      onSelect={(e) => {
        if (
          textareaRef.current &&
          textareaRef.current.selectionStart ===
            textareaRef.current.selectionEnd &&
          e.nativeEvent.type !== 'mouseup'
        ) {
          setTargetCursorIndex(
            textareaRef.current.selectionStart ||
              textareaRef.current.selectionStart === 0
              ? {
                  index: textareaRef.current.selectionStart,
                  movementTriggeredBy: 'keyboard',
                }
              : null
          );
        }
      }}
      onClick={(e) => {
        if (
          textareaRef.current &&
          textareaRef.current.selectionStart ===
            textareaRef.current.selectionEnd
        ) {
          setTargetCursorIndex(
            textareaRef.current.selectionStart ||
              textareaRef.current.selectionStart === 0
              ? {
                  index: textareaRef.current.selectionStart,
                  movementTriggeredBy: 'mouse',
                }
              : null
          );
        }
      }}
      spellCheck={false}
      style={{
        minHeight: calculateMinHeight(),
      }}
    />
  );
};

export default TargetTextArea;
