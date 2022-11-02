import { ActiveWorkerTextSelection } from 'src/types/socket';

const trimPartialWords = (
  completeText: string,
  selectionText: string,
  startIndex: number
): ActiveWorkerTextSelection | null => {
  const endIndex = startIndex + selectionText.length;

  let newStartIndexOffset = 0;
  let newEndIndexOffset = 0;

  // START
  if (startIndex !== 0) {
    const charBefore = completeText.charAt(startIndex - 1);
    const isWhitespaceOrSpecialChar = /([!-\/:-@[-`{-~\s])/.test(charBefore);

    if (!isWhitespaceOrSpecialChar) {
      const searchResult = selectionText.search(/\s/);

      if (searchResult === -1) {
        return null;
      }

      newStartIndexOffset = searchResult;
    }
  }

  // END
  if (completeText.length > endIndex) {
    const charAfter = completeText.charAt(endIndex);

    const isWhitespaceOrSpecialChar = /([!-\/:-@[-`{-~\s])/.test(charAfter);

    if (!isWhitespaceOrSpecialChar) {
      const newSelection = selectionText.slice(newStartIndexOffset);
      const newSelectionReversed = newSelection.split('').reverse().join('');
      const searchResult = newSelectionReversed.search(/\s/);
      if (searchResult === -1) {
        return null;
      }
      const splitIndex = newSelection.length - searchResult;
      newEndIndexOffset =
        splitIndex + newStartIndexOffset - selectionText.length;
    }
  }

  const result = {
    startIndex: startIndex + newStartIndexOffset,
    endIndex: endIndex + newEndIndexOffset,
    value: selectionText.substring(
      newStartIndexOffset,
      selectionText.length + newEndIndexOffset
    ),
  };

  console.log('result');

  return result;
};

export default trimPartialWords;
