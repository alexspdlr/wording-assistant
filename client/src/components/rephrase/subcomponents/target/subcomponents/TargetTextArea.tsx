import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import useBoundStore from 'src/store';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
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
    `
);

interface TargetTextAreaProps {
  targetValue: string | null;
  setTargetValue: Function;
  setTargetCursorIndex: (target: TargetCursorIndexInfo | null) => void;
}

const TargetTextArea = (props: TargetTextAreaProps) => {
  const { targetValue, setTargetValue, setTargetCursorIndex } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useRephraseToolTextboxSize(targetValue || '', textareaRef);

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

  return (
    <TextArea
      id='target-value-input'
      ref={textareaRef}
      value={targetValue || ''}
      disabled={!targetValue}
      onChange={(e) => {
        setTargetValue(e.target.value);
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
