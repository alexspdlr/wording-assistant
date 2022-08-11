import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
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

interface SentenceProps {
  hovered: boolean;
  otherTokenHovered: boolean;
}

const Sentence = styled('span')(
  (props: SentenceProps) => `
  padding-top: 2px; 
  padding-bottom: 2px; 
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  white-space: pre-wrap;

  ${
    props.hovered
      ? `
    background-color: #EDF1F3; 
    color: #0F2B46;
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color;
    `
      : props.otherTokenHovered
      ? `
    color: #bbbdc0;
    transition: 0.2s color;
    `
      : `
      color: #333333;
      transition: 0.2s color;`
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
  const [hoveredSentence, setHoveredSentence] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  const generateRephrasingBase = useBoundStore(
    (state) => state.generateRephrasingBase
  );

  return (
    <Container ref={containerRef} tabIndex={0} id='source-select-container'>
      {splitIntoSentences(value).map((token, i) =>
        token.kind === 'sentence' ? (
          <Sentence
            onClick={() => generateRephrasingBase(token.value)}
            onMouseEnter={() => setHoveredSentence(`token_${i}`)}
            onMouseLeave={() => setHoveredSentence(null)}
            hovered={hoveredSentence === `token_${i}`}
            otherTokenHovered={
              hoveredSentence !== null && hoveredSentence !== `token_${i}`
            }
            key={`token_${i}`}
          >
            {token.value}
          </Sentence>
        ) : (
          <span key={`token_${i}`} style={{ whiteSpace: 'pre-wrap' }}>
            {token.value}
          </span>
        )
      )}
    </Container>
  );
};

export default SourceSelect;
