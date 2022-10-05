import { useEffect } from 'react';
import addAlphaToHexColor from './addAlphaToHexColor';

interface Range {
  startIndex: number;
  endIndex: number;
}

const highlightText = (
  type: 'appear' | 'disappear',
  text: string,
  highlightRanges: Range[],
  color: string,
  opacity?: number
) => {
  return highlightRanges.reduceRight(
    (resultingString, range) =>
      `${resultingString.slice(
        0,
        range.startIndex
      )}<mark style="padding:3px 0px 4px 0px; color:transparent; ${
        type === 'appear'
          ? 'opacity: 1;'
          : 'transition: opacity 100ms ease-out; opacity: 0;'
      } background-color: ${addAlphaToHexColor(
        color,
        opacity || 1
      )}};">${resultingString.slice(
        range.startIndex,
        range.endIndex
      )}</mark>${resultingString.slice(range.endIndex)}`,
    text
  );
};

export default highlightText;
