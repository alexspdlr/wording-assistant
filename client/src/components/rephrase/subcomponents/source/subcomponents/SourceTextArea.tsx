import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import useRephraseToolTextboxHeight from 'src/utils/hooks/useRephraseToolTextboxHeight';
import SourceClearButton from './SourceClearButton';

const SourceClearButtonPositioned = styled(SourceClearButton)(
  () => `
   
  `
);
const TextArea = styled('textarea')(
  () => `
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
    min-height: 100%;
    margin: 16px 56px 72px 16px;
    `
);

interface SourceTextAreaProps {
  value: string;
  setValue: Function;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value, setValue } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useRephraseToolTextboxHeight(value, textareaRef);

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
