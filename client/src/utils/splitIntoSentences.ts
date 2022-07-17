import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import determineWhitespace from './determineWhitespace';

const nlp = winkNLP(model);

const splitIntoSentences = (value: string) => {
  const sentences = nlp.readDoc(value).sentences().out();

  const result = determineWhitespace(value, sentences);

  return result;
};

export default splitIntoSentences;
