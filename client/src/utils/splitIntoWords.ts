import determineWhitespace from './determineWhitespace';

const splitIntoWords = (value: string) => {
  const split = value.split(' ');

  const result = determineWhitespace(value, split);

  return result;
};

export default splitIntoWords;
