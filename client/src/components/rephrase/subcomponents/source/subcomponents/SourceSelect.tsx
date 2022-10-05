import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoSentences from 'src/utils/splitIntoSentences';

const Container = styled('div')(
  (props) => `
  margin: 16px 56px 72px 28px;
  flex-grow: 1;
  outline: none;
  display: block; 
  z-index: 2;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
  font-weight: 400;
  overflow: visible;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  animation: fade 300ms;
  @keyframes fade {
    0% { opacity: 0; } 
    50% {opacity: 0.8;}
    100% { opacity: 1; }
  }

      `
);

interface SentenceProps {
  active: boolean;
  otherTokenActive: boolean;
}

const Sentence = styled('span')(
  (props: SentenceProps) => (defaultProps) =>
    `
  padding-top: 4px; 
  padding-bottom: 3px; 
  white-space: pre-wrap;



  ${
    props.active
      ? `
    color: ${defaultProps.theme.palette.primary.main};
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color;
    
    `
      : props.otherTokenActive
      ? `
    color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 0.3)};  
    transition: 0.2s color;
    `
      : `
      color: ${defaultProps.theme.palette.text.main}; 
      transition: 0.2s color;`
  }

  &:hover {
    background-color: ${addAlphaToHexColor(
      defaultProps.theme.palette.primary.light,
      0.1
    )}; 
    color: ${defaultProps.theme.palette.text.main};
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color; 
  }
  `
);

interface SourceSelectProps {
  value: string;
}

const SourceSelect = (props: SourceSelectProps) => {
  const { value } = props;
  const containerRef = useRef(null);
  useRephraseToolTextboxSize(value, containerRef);
  const [hoveredSentence, setHoveredSentence] = useState<string | null>(null);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);

  const sentenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  const selectSentence = (value: string, index: number) => {
    setSelectedSentence(`token_${index}`);
  };

  return (
    <Container ref={containerRef} tabIndex={0} id='source-select-container'>
      {splitIntoSentences(value).map((token, i) =>
        token.kind === 'clickable' ? (
          <Sentence
            ref={sentenceRef}
            onClick={() => selectSentence(token.value, i)}
            onMouseEnter={() => setHoveredSentence(`token_${i}`)}
            onMouseLeave={() => setHoveredSentence(null)}
            active={selectedSentence === `token_${i}`}
            otherTokenActive={
              (hoveredSentence !== null && hoveredSentence !== `token_${i}`) ||
              (selectedSentence !== null && selectedSentence !== `token_${i}`)
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
