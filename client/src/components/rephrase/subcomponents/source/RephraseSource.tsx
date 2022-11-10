import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import RephraseHint from '../RephraseHint';
import SourceActionButtons from './subcomponents/action-buttons/SourceActionButtons';
import SourceTextArea from './subcomponents/SourceTextArea';

/* ---------------------------- Styled components --------------------------- */

const Wrapper = styled('div')(
  () => `
  width: 100%;
  display: flex; 
  flex-grow: 1;
  `
);

const Container = styled('div')(
  () => `   
  width: 100%;  
  display: flex; 
  flex-grow: 1;
  `
);

/* -------------------------------------------------------------------------- */
/*                               RephraseSource                               */
/* -------------------------------------------------------------------------- */

const RephraseSource = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');

  return (
    <Wrapper>
      <Container id='source-container'>
        <RephraseHint
          hideHint={value ? value.length > 0 : false}
          title='Paste or write your text'
          subtitle='Paste (Ctrl + V) or write the complete input text here. You can then rephrase it sentence by sentence.'
        />
        <SourceTextArea
          value={value || ''}
          setValue={(newVal: any) =>
            setSearchParams({ 'source-value': newVal })
          }
        />
      </Container>
      <SourceActionButtons />
    </Wrapper>
  );
};

export default RephraseSource;
