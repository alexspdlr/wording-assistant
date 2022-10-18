import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import highlightText from 'src/utils/highlightText';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';

interface ContainerProps {
  textSelected: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    ` 
  position: absolute; 
  margin: 0px 60px 0px 0px;  
  padding: 28px 0px 0px 28px; 
  flex-grow: 1;
  outline: none; 
  display: block;   
  z-index: 0;
  line-height: 0;  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;
  font-weight: 400;
  white-space: pre-wrap; 
  overflow: visible;
  color: ${addAlphaToHexColor(
    defaultProps.theme.palette.text.light,
    props.textSelected ? 0.4 : 1
  )}; 
  transition: color 300ms ease-in-out, background-color 00ms ease-in-out;
  -webkit-font-smoothing: antialiased; 
  -webkit-touch-callout: none;
  -webkit-user-select: none; 
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;   
      `
);

interface SourceHighlighterProps {
  value: string;
  startIndex: number | null;
  endIndex: number | null;
}

const SourceHighlighter = (props: SourceHighlighterProps) => {
  const { value, startIndex, endIndex } = props;

  /* ----------------------------- GET STORE DATA ----------------------------- */
  const highlighterRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  useRephraseToolTextboxSize(value, highlighterRef);

  const characters = Array.from(value);

  const lineHeight =
    document.getElementById(`source-value-input`)?.style.lineHeight;

  const getLines = () => {
    const characterPositions = characters.map((char, i) => {
      const el = document.getElementById(`source-input-letter-${i}`);

      if (el) {
        return { element: el.getBoundingClientRect(), index: i };
      } else {
        return null;
      }
    });

    const lines = _.groupBy(characterPositions, (char) => char?.element.y);

    const reducedInfos = Object.values(lines).map((line) =>
      line.map((character) => {
        return { width: character?.element.width, index: character?.index };
      })
    );

    return reducedInfos;
  };

  return (
    <Container
      ref={highlighterRef}
      textSelected={
        startIndex !== null && endIndex !== null && startIndex !== endIndex
      }
    >
      <span
        style={{
          position: 'relative',
          top: 0,
          left: 0,
        }}
      >
        {characters.map((letter, i) => (
          <span
            id={`source-input-letter-${i}`}
            style={{
              overflow: 'visible',
              backgroundColor: 'transparent',
            }}
          >
            {letter}
          </span>
        ))}
      </span>

      <span
        style={{
          position: 'absolute',
          padding: '28px 0px 0px 28px',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        {Array.from(value).map((letter, i) => (
          <span
            style={{
              overflow: 'visible',
              color:
                startIndex && endIndex && i >= startIndex && i < endIndex
                  ? theme.palette.text.light
                  : 'transparent',
              zIndex: Array.from(value).length - i + 1,
              padding: '4px 0px 4px 0px',
              borderRadius: 14,
            }}
          >
            {letter}
          </span>
        ))}
      </span>

      <div
        style={{
          position: 'absolute',
          margin: '28px 60px 0px 28px',
          width: 'calc(100% - 28px)',
          display: 'flex',
          flexDirection: 'column',
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      >
        {getLines().map((line, i) => (
          <div
            style={{
              display: 'flex',
            }}
          >
            {line.map((character) => (
              <div
                style={{
                  backgroundColor:
                    startIndex &&
                    endIndex &&
                    character.index &&
                    character.index >= startIndex &&
                    character.index < endIndex
                      ? '#ffe6b7'
                      : 'transparent',
                  width: character.width,
                  height: lineHeight,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/*parse(
        highlightText(
          value,
          [
            {
              startIndex: startIndex || 0,
              endIndex: endIndex || 0,
            },
          ],
          'transparent',
          theme.palette.primary.main
        )
        )*/}
    </Container>
  );
};

export default SourceHighlighter;
