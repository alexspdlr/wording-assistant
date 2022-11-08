/* eslint-disable no-useless-escape */
import { TextToken, TextTokenReduced } from 'src/types/store';
import determineWhitespace from './determineWhitespace';

const splitIntoWords = (value: string) => {
  // determine whitespace
  const split = value.split(/[\s]+/);

  const splitWhitespaceResult = determineWhitespace(value, split);

  // determine special chars
  const splitSpecialCharsResult: TextTokenReduced[] = splitWhitespaceResult
    .map((token) => {
      if (token.kind === 'whitespace') {
        return token;
      } else {
        const tokenSplit = token.value
          .split(/([!-\/:-@[-`{-~\s])/)
          .filter((subToken) => subToken.length !== 0);

        return tokenSplit.map((subToken) => {
          const newToken: TextTokenReduced = {
            value: subToken,
            kind: /([!-\/:-@[-`{-~\s])/.test(subToken)
              ? 'special_character'
              : 'text',
          };
          return newToken;
        });
      }
    })
    .flat();

  // Add indices
  let withIndex: TextToken[] = [];

  let runningIndex = 0;

  splitSpecialCharsResult.forEach((item) => {
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
