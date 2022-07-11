import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import calculateRephraseToolTextSize from 'src/utils/calculateRephraseToolTextSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useWindowHeight from 'src/utils/hooks/useWindowSize';
import SourceClearButton from './SourceClearButton';
import SourceCopyButton from './SourceCopyButton';

interface TextAreaProps {
  minHeight: string;
}

const TextArea = styled('textarea')(
  (props: TextAreaProps) => `
    min-height: ${props.minHeight};
    margin: 24px 64px 80px 24px;
    padding: 0;
    flex-grow: 1;
    outline: none;
    border: none;
    display: block;
    resize: none;
    z-index: 2;
    background-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400;
    color: rgb(51, 51, 51);  
    overflow: visible;
      `
);

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const activeBreakpoint = useBreakpoint();
  const windowHeight = useWindowHeight();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const textAreaMinHeight = () => {
    if (isMobileLayout) return '17vh';
    if (windowHeight > 990) return '439px';
    return '45vh';
  };

  const resetInput = () => {
    setValue('');
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = '';
    }
    textareaRef.current?.focus();
  };

  const copyValue = () => {
    navigator.clipboard
      .writeText(value || '')
      .then(() => {
        alert(`"${value}" was copied to clipboard.`);
      })
      .catch((err) => {
        alert(`Error copying text to clipboard: ${err}`);
      });
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const textSize = calculateRephraseToolTextSize(
        activeBreakpoint,
        value ? value.length : 0
      );
      textareaRef.current.style.fontSize = `${textSize.fontSize}px`;
      textareaRef.current.style.lineHeight = `${textSize.lineHeight}px`;
    }
  }, [value, activeBreakpoint, windowHeight]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
  }, [value]);

  return (
    <>
      <TextArea
        ref={textareaRef}
        onChange={textAreaChange}
        autoFocus
        minHeight={textAreaMinHeight()}
      >
        {value}
      </TextArea>
      {value && value.length > 0 && <SourceClearButton onClick={resetInput} />}
      <SourceCopyButton onClick={copyValue} />
    </>
  );
};

export default SourceTextArea;
