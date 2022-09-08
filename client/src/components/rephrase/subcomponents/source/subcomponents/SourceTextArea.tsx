import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import SourceClearButton from './SourceClearButton';

const TextArea = styled('textarea')(
  (props) => `
    padding: 0;
    flex-grow: 1;
    border: none; 
    outline: none;
    display: block;
    resize: none; 
    z-index: 2; 
    background-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
    font-weight: 400; 
    color: ${props.theme.palette.text.main};  
    overflow: visible;
    margin: 16px 56px 72px 28px;
    `
);

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useRephraseToolTextboxSize(value, textareaRef);

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const resetInput = () => {
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

  return (
    <>
      <TextArea
        ref={textareaRef}
        onChange={textAreaChange}
        autoFocus
        value={value}
      />

      {value && value.length > 0 && <SourceClearButton onClick={resetInput} />}
    </>
  );
};

export default SourceTextArea;
