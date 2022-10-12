import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import copyToClipboard from 'src/utils/copyToClipboard';
import RephraseHint from '../RephraseHint';
import SourceCopyButton from './subcomponents/action-buttons/SourceCopyButton';
import SourceTextArea from './subcomponents/SourceTextArea';

const Wrapper = styled('div')(
  () => `
  width: 100%;
  background-color: red; 
  display: flex; 
  flex-grow: 1;
  `
);

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => `   
  width: 100%;  
  display: flex; 
  flex-grow: 1;
  background-color: blue; 
  `
);

interface RephraseSourceProps {}

const RephraseSource = (props: RephraseSourceProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const isMobileDevice = false;

  return (
    <Wrapper>
      <Container id='source-container'>
        {isMobileDevice ? (
          <>{/* <SourceSelect value={value || ''} />*/}</>
        ) : (
          <>
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
          </>
        )}
      </Container>
      <SourceCopyButton onClick={() => copyToClipboard(value || '')} />
    </Wrapper>
  );
};

export default RephraseSource;
