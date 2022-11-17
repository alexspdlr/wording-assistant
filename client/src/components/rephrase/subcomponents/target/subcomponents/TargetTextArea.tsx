/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import React, { MutableRefObject, useCallback, useEffect } from 'react';
import useBoundStore from 'src/store';
import useIsTyping from 'src/utils/hooks/useIsTyping';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import { TargetCaretIndexInfo } from '../RephraseTarget';

/* ---------------------------- Styled components --------------------------- */

const TextArea = styled('textarea')(
  (defaultProps) =>
    `   
    position: absolute; 
    z-index: 2; 
    width: calc(100% - 56px);
    flex-grow: 1;  
    border: none;  
    outline: none;  
    display: block; 
    resize: none; 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400; 
    overflow: visible;
    background-color: transparent;  
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

/* -------------------------------------------------------------------------- */
/*                               TargetTextArea                               */
/* -------------------------------------------------------------------------- */

interface TargetTextAreaProps {
  textAreaRef: MutableRefObject<any>;
  setTargetCaretIndex: (target: TargetCaretIndexInfo | null) => void;
  setIsTypingInTarget: (bool: boolean) => void;
  setTargetTextAreaIsFocused: (bool: boolean) => void;
}

const TargetTextArea = (props: TargetTextAreaProps) => {
  const {
    textAreaRef,
    setTargetCaretIndex,
    setIsTypingInTarget,
    setTargetTextAreaIsFocused,
  } = props;

  // FROM STORE
  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const setActiveTextSelection = useBoundStore(
    (state) => state.setActiveTextSelection
  );
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const updateTargetText = useBoundStore((state) => state.updateTargetText);

  // UTILS
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

  const handleTextareaChange = (e: any) => {
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
  };

  const handleTextareaSelect = (e: any) => {
    if (
      textAreaRef.current &&
      textAreaRef.current.selectionStart === textAreaRef.current.selectionEnd &&
      e.nativeEvent.type !== 'mouseup'
    ) {
      setTargetCaretIndex(
        textAreaRef.current.selectionStart ||
          textAreaRef.current.selectionStart === 0
          ? {
              index: textAreaRef.current.selectionStart,
              movementTriggeredBy: 'keyboard',
            }
          : null
      );
    }
  };

  const handleTextareaClick = (e: any) => {
    if (
      textAreaRef.current &&
      textAreaRef.current.selectionStart === textAreaRef.current.selectionEnd
    ) {
      setTargetCaretIndex(
        textAreaRef.current.selectionStart ||
          textAreaRef.current.selectionStart === 0
          ? {
              index: textAreaRef.current.selectionStart,
              movementTriggeredBy: 'mouse',
            }
          : null
      );
    }
  };

  // OTHER HOOKS
  const [isTyping, register] = useIsTyping();
  useRephraseToolTextboxSize(activeTextSelection?.value || '', textAreaRef);
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

  // USE EFFECTS
  useEffect(() => {
    if (textAreaRef.current) register(textAreaRef.current);
  }, [textAreaRef.current]);

  useEffect(() => {
    setIsTypingInTarget(isTyping);
  }, [isTyping]);

  // RENDER
  return (
    <TextArea
      id='target-value-input'
      ref={textAreaRef}
      value={activeTextSelection?.value || ''}
      disabled={!activeTextSelection}
      onFocus={() => setTargetTextAreaIsFocused(true)}
      onBlur={() => setTargetTextAreaIsFocused(false)}
      onChange={handleTextareaChange}
      onSelect={handleTextareaSelect}
      onClick={handleTextareaClick}
      spellCheck={false}
      style={{
        minHeight: calculateMinHeight(),
      }}
    />
  );
};

export default TargetTextArea;
