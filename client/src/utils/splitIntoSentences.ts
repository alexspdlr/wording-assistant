import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP(model);

const splitIntoSentences = (value: string) => {
  const sentences = nlp.readDoc(value).sentences().out();

  return sentences;
};

export default splitIntoSentences;
