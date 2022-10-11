interface Token {
  value: string;
  kind: 'whitespace' | 'word';
}

interface Accumulator {
  reducedText: string;
  output: Token[];
}

const reformat = (
  accumulator: Accumulator,
  currentValue: string,
  index: number,
  array: Array<any>
) => {
  const after = accumulator.reducedText.slice(
    accumulator.reducedText.indexOf(currentValue) + currentValue.length
  );

  const before = accumulator.reducedText.slice(
    0,
    accumulator.reducedText.indexOf(currentValue)
  );

  const newOutput =
    index === array.length - 1
      ? ([
          {
            value: before,
            kind: 'whitespace',
          },
          {
            value: currentValue,
            kind: 'word',
          },
          {
            value: after.endsWith('\n') ? after.concat('\n') : after,
            kind: 'whitespace',
          },
        ] as Token[])
      : ([
          {
            value: before,
            kind: 'whitespace',
          },
          {
            value: currentValue,
            kind: 'word',
          },
        ] as Token[]);

  const result: Accumulator = {
    reducedText: after,
    output: [...accumulator.output, ...newOutput],
  };

  return result;
};

const determineWhitespace = (text: string, sentences: string[]) => {
  const reducedResult = sentences.reduce(reformat, {
    reducedText: text,
    output: [],
  } as Accumulator);

  return reducedResult.output.filter((item) => item.value !== '');
};

export default determineWhitespace;
