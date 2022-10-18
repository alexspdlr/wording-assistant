import styled from '@emotion/styled';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import { ActiveWorkerTextSelection } from 'src/types/socket';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import replaceCharactersBetween from 'src/utils/replaceCharactersBetween';
import SourceClearButton from './action-buttons/SourceClearButton';
import SourceHighlighter from './SourceHighlighter';

interface TextAreaProps {
  textSelected: boolean;
}

const TextArea = styled('textarea')(
  (props: TextAreaProps) => (defaultProps) =>
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
    margin: 0px 60px 60px 0px;  
    padding: 28px 0px 0px 28px;  
    -webkit-font-smoothing: antialiased; 
    color: transparent; 
    caret-color: ${defaultProps.theme.palette.text.light};

    ::selection{
      background-color: transparent;  
    } 
    `
);

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;

  /* --------------------------- GET DATA FROM STORE -------------------------- */

  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );
  const activeTextSelection = useBoundStore(
    (state) => state.uiState.activeTextSelection
  );
  const expectedResponse = useBoundStore(
    (state) => state.uiState.expectedResponse
  );
  const setOriginalTextSelection = useBoundStore(
    (state) => state.setOriginalTextSelection
  );
  const deselectText = useBoundStore((state) => state.deselectText);
  const selectText = useBoundStore((state) => state.selectText);

  /* ------------------------------- OTHER HOOKS ------------------------------ */

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);

  /* ---------------------------------- UTILS --------------------------------- */
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);

    if (
      originalTextSelection?.value &&
      originalTextSelection?.value.length > 0
    ) {
      deselectText();
    }
  };
  const resetInput = () => {
    deselectText();
    setValue('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current?.focus();
  };
  const onSelectText = (event: SyntheticEvent<HTMLTextAreaElement, Event>) => {
    if (event.isTrusted) {
      const selection = window.getSelection();

      const selectionString = selection?.toString();

      if (selectionString && selection && textareaRef.current) {
        selectText({
          value: selectionString,
          startIndex: textareaRef.current.selectionStart,
          endIndex: textareaRef.current.selectionEnd,
        });
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

  /* ------------------------------- USE EFFECTS ------------------------------ */
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectionChangeListener = (event: Event) => {
      const selection = window.getSelection();
      const selectionString = selection?.toString();
      const anchorNode = selection?.anchorNode as HTMLElement;

      if (anchorNode?.id === 'source-container') {
        if (selection && selectionString) {
          if (textareaRef.current) {
            const newRange = {
              startIndex: textareaRef.current?.selectionStart,
              endIndex: textareaRef.current?.selectionEnd,
            };

            if (
              newRange.startIndex !== originalTextSelection?.startIndex ||
              newRange.endIndex !== originalTextSelection?.endIndex
            ) {
              setOriginalTextSelection({
                value: value.substring(newRange.startIndex, newRange.endIndex),
                endIndex: newRange.endIndex,
                startIndex: newRange.startIndex,
              });
            }
          }
        } else {
          deselectText();
        }
      }
    };

    document.addEventListener('selectionchange', selectionChangeListener);

    const dragStartListener = (event: Event) => {
      event.preventDefault();
    };

    document
      .getElementById('source-value-input')
      ?.addEventListener('dragstart', dragStartListener);

    return () => {
      document.removeEventListener('selectionchange', selectionChangeListener);
      document
        .getElementById('source-value-input')
        ?.removeEventListener('dragstart', dragStartListener);
    };
  }, []);

  const [localActivetextSelection, setLocalActiveTextSelection] =
    useState<ActiveWorkerTextSelection | null>(activeTextSelection);

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
      <SourceHighlighter
        value={value || ''}
        startIndex={localActivetextSelection?.startIndex || null}
        endIndex={localActivetextSelection?.endIndex || null}
      />
      <TextArea
        id='source-value-input'
        ref={textareaRef}
        onChange={textAreaChange}
        onSelect={onSelectText}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            deselectText();
          }
        }}
        autoFocus
        value={value}
        disabled={loadingRephrasing}
        spellCheck={false}
        textSelected={
          originalTextSelection?.startIndex !== originalTextSelection?.endIndex
        }
        style={{
          minHeight: calculateMinHeight(),
        }}
      />
      {value && value.length > 0 && <SourceClearButton onClick={resetInput} />}
    </>
  );
};

export default SourceTextArea;
