interface Token {
  value: string;
  kind: string;
}

interface Accumulator {
  reducedText: string;
  output: Token[];
}

const reformat = (
  accumulator: Accumulator,
  currentValue: string,
  index: number
) => {
  const after = accumulator.reducedText.slice(
    accumulator.reducedText.indexOf(currentValue) + currentValue.length
  );

  const before = accumulator.reducedText.slice(
    0,
    accumulator.reducedText.indexOf(currentValue)
  );

  if (index === 0) {
    console.log(currentValue);
    console.log(after);
  }

  const result: Accumulator = {
    reducedText: after,
    output: [
      ...accumulator.output,
      ...[
        { value: before, kind: 'whitespace' },
        { value: currentValue, kind: 'sentence' },
      ],
    ],
  };

  return result;
};

const determineWhitespace = (text: string, sentences: string[]) => {
  const reducedResult = sentences.reduce(reformat, {
    reducedText: text,
    output: [],
  } as Accumulator);

  return reducedResult.output;
};

export default determineWhitespace;
