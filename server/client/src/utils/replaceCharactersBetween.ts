const replaceCharactersBetween = (
  originalStirng: string,
  replacementString: string,
  replacementStartIndex: number,
  replacementEndIndex: number
) => {
  return (
    originalStirng.substr(0, replacementStartIndex) +
    replacementString +
    originalStirng.substr(replacementEndIndex)
  );
};

export default replaceCharactersBetween;
