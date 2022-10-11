/* eslint-disable no-useless-escape */
import { TextToken } from 'src/types/store';
import determineWhitespace from './determineWhitespace';

const splitIntoWords = (value: string) => {
  const split = value.split(/[\s]+/);

  const result = determineWhitespace(value, split);

  let withIndex: TextToken[] = [];

  let runningIndex = 0;

  result.forEach((item) => {
    withIndex.push({
      value: item.value,
      kind: item.kind,
      startIndex: runningIndex,
      endIndex: runningIndex + item.value.length,
    });

    runningIndex += item.value.length;
  });

  return withIndex;
};

export default splitIntoWords;
