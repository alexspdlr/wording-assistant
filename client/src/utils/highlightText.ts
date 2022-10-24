import { useEffect } from 'react';
import addAlphaToHexColor from './addAlphaToHexColor';
import parse from 'html-react-parser';

interface Range {
  startIndex: number;
  endIndex: number;
}

const highlightText = (
  text: string,
  highlightRanges: Range[],
  color: string,
  textColor: string
) => {
  return highlightRanges.reduceRight(
    (resultingString, range) =>
      `${resultingString.slice(
        0,
        range.startIndex
      )}<mark style="padding:3px 0px 4px 0px; color:${textColor}; background-color: ${color};">${resultingString.slice(
        range.startIndex,
        range.endIndex
      )}</mark>${resultingString.slice(range.endIndex)}`,
    text
  );
};

export default highlightText;
