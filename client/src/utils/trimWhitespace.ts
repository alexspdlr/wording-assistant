import { ActiveWorkerTextSelection } from 'src/types/socket';

const trimWhitespace = (
  selectionText: string,
  startIndex: number
): ActiveWorkerTextSelection => {
  const trimmed = selectionText.trim();
  const trimmedStartIndex =
    startIndex + selectionText.indexOf(trimmed.charAt(0));
  const trimmedEndIndex = trimmedStartIndex + trimmed.length;

  return {
    value: trimmed,
    startIndex: trimmedStartIndex,
    endIndex: trimmedEndIndex,
  };
};

export default trimWhitespace;
