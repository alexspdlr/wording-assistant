import styled from '@emotion/styled';
import React, {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import useBoundStore from 'src/store';
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
      props.textSelected ? 0.5 : 1
    )};

    transition: color 200ms linear;

    ::selection{
      color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 1)};
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
  const selectedText = useBoundStore((state) => state.originalText);
  const [range, setRange] = useState<SelectionRange | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);

  const resetSelection = useBoundStore((state) => state.reset);

  const onClickAway = (event: any) => {
    const targetNode = event.target;
    const parentNode = event.target.parentNode;

    if (
      parentNode.id !== 'target-select-container' &&
      targetNode.id !== 'target-select-container'
    ) {
      resetSelection();
      setRange(null);
      textareaRef.current?.focus();
    } else {
      console.log(' select word or click parent   ');
    }
  };

  useClickAway(textareaRef, onClickAway);

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const resetInput = () => {
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

  const generateRephrasingBase = useBoundStore(
    (state) => state.generateRephrasingBase
  );

  const onSelectText = (event: SyntheticEvent<HTMLTextAreaElement, Event>) => {
    if (event.isTrusted) {
      const selection = window.getSelection();

      console.log(selection?.toString());

      const selectionString = selection?.toString();

      if (selectionString && selection) {
        generateRephrasingBase(selectionString);
      }
    }
  };

  // highlight selected text

  useEffect(() => {
    const listener = (event: Event) => {
      const selection = window.getSelection();

      const selectionString = selection?.toString();
      const anchorNode = selection?.anchorNode as HTMLElement;

      if (
        selection &&
        selectionString &&
        anchorNode?.id === 'source-container' &&
        event
      ) {
        if (event && textareaRef.current) {
          const newRange = {
            startIndex: textareaRef.current?.selectionStart,
            endIndex: textareaRef.current?.selectionEnd,
          };
          setRange(newRange);
        }
      }
    };

    document.addEventListener('selectionchange', listener);
    return () => document.removeEventListener('selectionchange', listener);
  }, []);

  useEffect(() => {
    if (!selectedText || selectedText.length === 0) {
      setRange(null);
    }
  }, [selectedText]);

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
