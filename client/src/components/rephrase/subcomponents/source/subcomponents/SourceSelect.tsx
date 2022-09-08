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
    color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 0.5)};  
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
    color: ${defaultProps.theme.palette.primary.light};
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

  const reset = useBoundStore((state) => state.reset);

  const onClose = () => {
    setSelectedSentence(null);
    reset();
  };

  useClickAway(sentenceRef, onClose);

  useEffect(() => {
    document.getElementById('source-select-container')?.focus();
  }, [containerRef]);

  const generateRephrasingBase = useBoundStore(
    (state) => state.generateRephrasingBase
  );

  const selectSentence = (value: string, index: number) => {
    setSelectedSentence(`token_${index}`);
    generateRephrasingBase(value);
  };

  return (
    <Container ref={containerRef} tabIndex={0} id='source-select-container'>
      {splitIntoSentences(value).map((token, i) =>
        token.kind === 'sentence' ? (
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
