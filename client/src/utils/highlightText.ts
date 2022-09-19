import addAlphaToHexColor from './addAlphaToHexColor';

interface Range {
  startIndex: number;
  endIndex: number;
}

const highlightText = (
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
      )}<mark style="padding:3px 0px 4px 0px; background-color: ${addAlphaToHexColor(
        color,
        opacity || 1
      )}}; transition: inherit;">${resultingString.slice(
        range.startIndex,
        range.endIndex
      )}</mark>${resultingString.slice(range.endIndex)}`,
    text
  );
};

export default highlightText;
