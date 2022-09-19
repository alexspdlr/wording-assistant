import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoWords from 'src/utils/splitIntoWords';

const Container = styled('div')(
  () => `
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

interface WordProps {
  hovered: boolean;
  otherTokenHovered: boolean;
}

const Word = styled('span')(
  (props: WordProps) => (defaultProps) =>
    `
  padding-top: 2px; 
  padding-bottom: 2px; 
  border-top: 1px solid ${defaultProps.theme.palette.background.light};
  border-bottom: 1px solid ${defaultProps.theme.palette.background.light};
  white-space: pre-wrap;

  ${
    props.hovered
      ? `
    background-color: ${addAlphaToHexColor(
      defaultProps.theme.palette.primary.light,
      0.175
    )}; 
    color: ${defaultProps.theme.palette.text.main};
    cursor: pointer; 
    transition: 0.2s background-color, 0.2s color;
    `
      : props.otherTokenHovered
      ? `
      color: ${addAlphaToHexColor(defaultProps.theme.palette.text.main, 0.5)};
    transition: 0.2s color;
    `
      : `
      color: ${defaultProps.theme.palette.text.main}; 
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

  const resetSelection = useBoundStore((state) => state.reset);

  const onClickAway = (event: any) => {
    resetSelection();
  };

  useClickAway(containerRef, onClickAway);

  return (
    <Container ref={containerRef} tabIndex={0} id='target-select-container'>
      <div style={{ padding: '24px 56px 72px 36px' }}>
        {splitIntoWords(value).map((token, i) =>
          token.kind === 'clickable' ? (
            <Word
              onMouseEnter={() => setHoveredWord(`token_${i}`)}
              onMouseLeave={() => setHoveredWord(null)}
              hovered={hoveredWord === `token_${i}`}
              otherTokenHovered={
                hoveredWord !== null && hoveredWord !== `token_${i}`
              }
              key={`token_${i}`}
            >
              {token.value}
            </Word>
          ) : (
            <span key={`token_${i}`} style={{ whiteSpace: 'pre-wrap' }}>
              {token.value}
            </span>
          )
        )}
      </div>
    </Container>
  );
};

export default TargetSelect;
