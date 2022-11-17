/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import { ActiveWorkerTextSelection } from 'src/types/socket';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';
import trimPartialWords from 'src/utils/trimPartialWords';
import trimWhitespace from 'src/utils/trimWhitespace';
import SourceClearButton from './action-buttons/SourceClearButton';
import SourceHighlighter from './SourceHighlighter';

/* ---------------------------- Styled components --------------------------- */

const TextArea = styled('textarea')(
  (defaultProps) =>
    `   
    position: relative; 
    z-index: 1; 
    width: calc(100% - 96px);
    flex-grow: 1;  
    border: none;  
    outline: none;  
    display: block; 
    resize: none; 
    background-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400; 
    overflow: visible;
    margin: 0px 60px 40px 0px;  
    padding: 28px 0px 0px 28px;  
    -webkit-font-smoothing: antialiased; 
    line-height: 0;
    color: transparent; 
    caret-color: ${defaultProps.theme.palette.text.light};
    transition: background-color 1000ms ease-in-out;
    ::selection{
      background-color: ${
        defaultProps.theme.activeMode === 'light'
          ? '#ffe4b3'
          : defaultProps.theme.palette.primary.light
      } ;    
      color:  ${defaultProps.theme.palette.text.light}; 
    } 
    `
);

/* -------------------------------------------------------------------------- */
/*                               SourceTextArea                               */
/* -------------------------------------------------------------------------- */

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}
const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;

  // FROM STORE
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const expectedResponse = useBoundStore(
    (state) => state.uiState.expectedResponse
  );
  const deselectText = useBoundStore((state) => state.deselectText);
  const selectText = useBoundStore((state) => state.selectText);

  // OTHER HOOKS
  const [localActivetextSelection, setLocalActiveTextSelection] =
    useState<ActiveWorkerTextSelection | null>(activeTextSelection);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);

  // UTILS
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
    if (
      originalTextSelection?.value &&
      originalTextSelection?.value.length > 0
    ) {
      deselectText();
    }
  };

  const handleResetInput = () => {
    deselectText();
    setValue('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current?.focus();
  };

  const handleSelectText = (
    event: SyntheticEvent<HTMLTextAreaElement, Event>
  ) => {
    if (event.isTrusted) {
      const selection = window.getSelection();

      const selectionString = selection?.toString();

      if (selectionString && selection && textareaRef.current) {
        const partialWordsTrimmedSelection = trimPartialWords(
          textareaRef.current.value,
          selectionString,
          textareaRef.current.selectionStart
        );

        if (partialWordsTrimmedSelection) {
          const trimmedSelection = trimWhitespace(
            partialWordsTrimmedSelection.value,
            partialWordsTrimmedSelection.startIndex
          );

          selectText(trimmedSelection);
        }
      }
    }
  };

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

  const loadingRephrasing =
    expectedResponse !== null &&
    (expectedResponse.endpoint === 'selectWordingAlternative' ||
      expectedResponse.endpoint === 'updateTargetText');

  // USE EFFECTS

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }

    const selectionChangeListener = (event: Event) => {
      const selection = window.getSelection();
      const selectionString = selection?.toString();
      const anchorNode = selection?.anchorNode as HTMLElement;
      if (anchorNode?.id === 'source-container') {
        if (!(selection && selectionString)) {
          deselectText();
        }
      }
    };

    const dragStartListener = (event: Event) => {
      event.preventDefault();
    };

    // Chrome & Safari
    document.addEventListener('selectionchange', selectionChangeListener);
    document
      .getElementById('source-value-input')
      ?.addEventListener('dragstart', dragStartListener);

    return () => {
      // Chrome & Safari
      document.removeEventListener('selectionchange', selectionChangeListener);
      document
        .getElementById('source-value-input')
        ?.removeEventListener('dragstart', dragStartListener);
    };
  }, []);

  useEffect(() => {
    if (activeTextSelection && localActivetextSelection) {
      const newSourceValue = replaceCharactersBetween(
        value,
        activeTextSelection.value,
        localActivetextSelection.startIndex,
        localActivetextSelection.endIndex
      );

      setValue(newSourceValue);
    }
    setLocalActiveTextSelection(activeTextSelection);
  }, [activeTextSelection]);

  return (
    <>
      <SourceHighlighter value={value || ''} />
      <TextArea
        id='source-value-input'
        ref={textareaRef}
        onChange={handleTextAreaChange}
        onSelect={handleSelectText}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            deselectText();
          }
        }}
        autoFocus
        value={value}
        disabled={loadingRephrasing}
        spellCheck={false}
        style={{
          minHeight: calculateMinHeight(),
        }}
      />
      {value && value.length > 0 && (
        <SourceClearButton onClick={handleResetInput} />
      )}
    </>
  );
};

export default SourceTextArea;
