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
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import wait from 'src/utils/wait';
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400; 
    overflow: visible;
    margin: 0px 60px 60px 0px;  
    padding: 24px 0px 0px 36px; 
    line-height: 0;
    color: ${addAlphaToHexColor(
      defaultProps.theme.palette.text.main,
      props.textSelected ? 0.6 : 1
    )}; 
    transition: color 300ms ease-in-out;
    ::selection{
      color: transparent;  
    } 
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
  const selectedText = useBoundStore((state) => state.uiState.originalText);
  const expectedResponse: UiExpectedResponse | null = useBoundStore(
    (state) => state.uiState.expectedResponse
  );
  const [range, setRange] = useState<SelectionRange | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);
  const deselectText = useBoundStore((state) => state.deselectText);
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const resetInput = () => {
    deselectText();
    setValue('');
    setRange(null);
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

      if (selectionString && selection) {
        selectText(selectionString);
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
            console.log('1');
            setRange(newRange);
          }
        } else {
          console.log('2');
          setRange(null);
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

  return (
    <>
      <SourceHighlighter
        value={value || ''}
        startIndex={range?.startIndex || 0}
        endIndex={range?.endIndex || 0}
      />
      <TextArea
        id='source-value-input'
        ref={textareaRef}
        onChange={textAreaChange}
        onSelect={onSelectText}
        onClick={() => {
          // handle deselect text in container
          const selection = window.getSelection();
          const selectionString = selection?.toString();
          if (!(selection && selectionString) || !range) {
            console.log('DESELECT TEXT ');
            setRange(null);
            deselectText();
          }
        }}
        onMouseDown={() => setRange(null)}
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
