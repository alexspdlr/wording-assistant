import { TextTokenReduced } from 'src/types/store';

interface Accumulator {
  reducedText: string;
  output: TextTokenReduced[];
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
            kind: 'text',
          },
          {
            value: after.endsWith('\n') ? after.concat('\n') : after,
            kind: 'whitespace',
          },
        ] as TextTokenReduced[])
      : ([
          {
            value: before,
            kind: 'whitespace',
          },
          {
            value: currentValue,
            kind: 'text',
          },
        ] as TextTokenReduced[]);

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
