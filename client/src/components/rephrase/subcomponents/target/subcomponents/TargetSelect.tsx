import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoWords from 'src/utils/splitIntoWords';

const Container = styled('div')(
  () => `
  margin: 16px 56px 72px 28px; 
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
    background-color: rgba(0, 99, 149, 0.2); 
    color: #0F2B46;
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color;
    `
      : props.otherTokenHovered
      ? `
      color: #999; 
    transition: 0.2s color;
    `
      : `
      color: #333333;
      transition: 0.2s color;`
  }
  `
);

interface TargetSelectProps {
  value: string;
}

const TargetSelect = (props: TargetSelectProps) => {
  const { value } = props;
  const containerRef = useRef(null);
  useRephraseToolTextboxSize(value, containerRef);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  return (
    <Container ref={containerRef} tabIndex={0} id='source-select-container'>
      {splitIntoWords(value).map((token, i) =>
        token.kind === 'sentence' ? (
          <Sentence
            onMouseEnter={() => setHoveredWord(`token_${i}`)}
            onMouseLeave={() => setHoveredWord(null)}
            hovered={hoveredWord === `token_${i}`}
            otherTokenHovered={
              hoveredWord !== null && hoveredWord !== `token_${i}`
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

export default TargetSelect;
