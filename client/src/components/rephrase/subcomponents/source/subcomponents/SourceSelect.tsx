import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import copyToClipboard from 'src/utils/copyToClipboard';
import useRephraseToolTextboxHeight from 'src/utils/hooks/useRephraseToolTextboxHeight';
import splitIntoSentences from 'src/utils/splitIntoSentences';
import SourceCopyButton from './SourceCopyButton';

const Container = styled('div')(
  () => `
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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
      `
);

const Sentence = styled('span')(
  () => `
  &:hover {
    background-color: rgba(0, 99, 149, 0.2);
    cursor: pointer; 
    transition: background-color 0.15s ease-out; 
  }
  `
);

interface SourceTextAreaProps {
  value: string;
}

const SourceTextArea = (props: SourceTextAreaProps) => {
  const { value } = props;
  const containerRef = useRef(null);
  useRephraseToolTextboxHeight(value, containerRef);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  return (
    <>
      <Container ref={containerRef} tabIndex={0} id='source-select-container'>
        {splitIntoSentences(value).map((sentence, i) => (
          <>
            {i !== 0 && <span> </span>}
            <Sentence>{sentence}</Sentence>
          </>
        ))}
      </Container>
      <SourceCopyButton onClick={() => copyToClipboard(value)} />
    </>
  );
};

export default SourceTextArea;
