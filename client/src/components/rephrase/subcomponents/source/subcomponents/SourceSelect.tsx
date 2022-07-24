import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import useRephraseToolTextboxHeight from 'src/utils/hooks/useRephraseToolTextboxHeight';
import splitIntoSentences from 'src/utils/splitIntoSentences';

const Container = styled('div')(
  () => `
  margin: 16px 56px 72px 16px;
  flex-grow: 1;
  outline: none;
  display: block; 
  z-index: 2;
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
  padding-top: 2px; 
  padding-bottom: 2px; 
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  white-space: pre-wrap;
  &:hover {
    background-color: rgba(0, 99, 149, 0.15);
    cursor: pointer; 
    transition: background-color 0.15s ease-out; 
  }
  `
);

interface SourceSelectProps {
  value: string;
}

const SourceSelect = (props: SourceSelectProps) => {
  const { value } = props;
  const containerRef = useRef(null);
  useRephraseToolTextboxHeight(value, containerRef);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  return (
    <Container ref={containerRef} tabIndex={0} id='source-select-container'>
      {splitIntoSentences(value).map((token, i) =>
        token.kind === 'sentence' ? (
          <Sentence key={`token_${i}`}>{token.value}</Sentence>
        ) : (
          <span key={`token_${i}`} style={{ whiteSpace: 'pre' }}>
            {token.value}
          </span>
        )
      )}
    </Container>
  );
};

export default SourceSelect;
