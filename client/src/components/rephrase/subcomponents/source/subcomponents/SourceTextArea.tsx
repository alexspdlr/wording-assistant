import styled from '@emotion/styled';
import React, {
  ReactEventHandler,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useBoundStore from 'src/store';
import { UiExpectedResponse } from 'src/types/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useMouseIsDown from 'src/utils/hooks/useMouseIsDown';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import wait from 'src/utils/wait';
import { Z_ASCII } from 'zlib';
import SourceClearButton from './SourceClearButton';
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
    padding: 24px 0px 0px 36px;  
    -webkit-font-smoothing: antialiased; 
    line-height: 0;
    color: ${addAlphaToHexColor(
      defaultProps.theme.palette.text.light,
      props.textSelected ? 0.7 : 1
    )}; 

    ::selection{
      color: ${
        props.textSelected
          ? 'transparent'
          : defaultProps.theme.palette.text.light
      }; 
    } 

    transition: color 300ms ease-in-out;
    `
);

interface SelectionRange {
  startIndex: number;
  endIndex: number;
}
interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const uiState = useBoundStore((state) => state.uiState);
  const mouseIsPressed = useMouseIsDown();
  const [range, setRange] = useState<SelectionRange | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);
  const deselectText = useBoundStore((state) => state.deselectText);
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRange(null);
    setValue(event.target.value);

    if (uiState.originalText && uiState.originalText.length > 0) {
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

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectText = useBoundStore((state) => state.selectText);

  const onSelectText = (event: SyntheticEvent<HTMLTextAreaElement, Event>) => {
    if (event.isTrusted) {
      const selection = window.getSelection();

      const selectionString = selection?.toString();

      if (selectionString && selection && textareaRef.current) {
        selectText(
          selectionString,
          textareaRef.current.selectionStart,
          textareaRef.current.selectionEnd
        );
      }
    }
  };

  // highlight selected text

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
            if (newRange !== range) {
              setRange(newRange);
            }
          }
        } else {
          setRange(null);

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

  const getMemoizedOriginalText = useCallback(() => {
    return uiState.originalText;
  }, [uiState.originalText]);

  useEffect(() => {
    const getRange = () => range;
    const getValue = () => value;
    const getUiState = () => uiState;
    const getTextareaRef = () => {
      if (textareaRef.current) {
        return textareaRef.current;
      }
    };
    const originalText = getMemoizedOriginalText();
    const localRange = getRange();
    const localTextAreaRef = getTextareaRef();
    const localUiState = getUiState();
    const localValue = getValue();

    // if selected text doesnt exists at same place (in source text) anymore
    if (
      localUiState.sourceSelectionStart &&
      localUiState.sourceSelectionEnd &&
      !(
        localValue.substring(
          localUiState.sourceSelectionStart,
          localUiState.sourceSelectionEnd
        ) === originalText
      )
    ) {
      deselectText();
    }

    if (
      localUiState.sourceSelectionStart === null ||
      localUiState.sourceSelectionEnd === null
    ) {
      // ui range === null

      // correct range
      if (localRange !== null) {
        setRange(null);
      }

      // correct textarea selection
      if (
        localTextAreaRef &&
        textareaRef.current &&
        localTextAreaRef.selectionStart !== localTextAreaRef.selectionEnd
      ) {
        textareaRef.current.selectionStart = localTextAreaRef.selectionEnd;
      }
    } else {
      // ui range !== null

      // correct range
      if (
        localRange === null ||
        localRange.startIndex !== localUiState.sourceSelectionStart ||
        localRange.startIndex !== localUiState.sourceSelectionEnd
      ) {
        setRange({
          startIndex: localUiState.sourceSelectionStart,
          endIndex: localUiState.sourceSelectionEnd,
        });
      }

      // correct textarea selection
      if (
        textareaRef.current &&
        (textareaRef.current.selectionStart !==
          localUiState.sourceSelectionStart ||
          textareaRef.current.selectionEnd !== localUiState.sourceSelectionEnd)
      ) {
        textareaRef.current.selectionStart = localUiState.sourceSelectionStart;
        textareaRef.current.selectionEnd = localUiState.sourceSelectionEnd;
      }
    }
  }, [getMemoizedOriginalText]);

  return (
    <>
      <SourceHighlighter
        value={value || ''}
        startIndex={range?.startIndex || 0}
        endIndex={range?.endIndex || 0}
        updateTextAreaSelection={(
          newStartIndex: number,
          newEndIndex: number
        ) => {
          /*
          if (!mouseIsPressed && textareaRef.current) {
            if (textareaRef.current.selectionStart !== newStartIndex) {
              textareaRef.current.selectionStart = newStartIndex;
            }
            if (textareaRef.current.selectionEnd !== newEndIndex) {
              textareaRef.current.selectionEnd = newEndIndex;
            }
          }
          */
        }}
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
        spellCheck={false}
        textSelected={range ? range.startIndex !== range.endIndex : false}
        style={{
          minHeight: calculateMinHeight(),
        }}
      />
      {value && value.length > 0 && <SourceClearButton onClick={resetInput} />}
    </>
  );
};

export default SourceTextArea;
