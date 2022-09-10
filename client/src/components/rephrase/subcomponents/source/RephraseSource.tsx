import styled from '@emotion/styled';
import { useEffect } from 'react';
import { RephraseInteractionMode } from 'src/types/rephrase';
import copyToClipboard from 'src/utils/copyToClipboard';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useLocalStorage from 'src/utils/hooks/useLocalStorage';
import useRephraseToolTextboxMinHeight from 'src/utils/hooks/useRephraseToolTextboxMinHeight';
import SourceCopyButton from './subcomponents/SourceCopyButton';
import RephraseHint from '../RephraseHint';
import SourceSelect from './subcomponents/SourceSelect';
import SourceTextArea from './subcomponents/SourceTextArea';
import { useSearchParams } from 'react-router-dom';

const Wrapper = styled('div')(
  () => `
  width: 100%;
  display: flex;
  align-content: stretch;
  align-items: stretch;
  position: relative; 
  `
);

interface ContainerProps {
  minHeight: string;
}

const Container = styled('div')(
  (props: ContainerProps) => `
  margin: 8px;
  padding: 0; 
  flex-grow: 1; 
  min-height: ${props.minHeight};
  position: relative;
  display: flex;
  `
);

interface RephraseSourceProps {
  activeMode: RephraseInteractionMode;
}

const RephraseSource = (props: RephraseSourceProps) => {
  const { activeMode } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const minHeight = useRephraseToolTextboxMinHeight();

  return (
    <Wrapper>
      <Container minHeight={minHeight}>
        {activeMode === RephraseInteractionMode.Edit ? (
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
        ) : (
          <>
            <SourceSelect value={value || ''} />
          </>
        )}
      </Container>
      <SourceCopyButton onClick={() => copyToClipboard(value || '')} />
    </Wrapper>
  );
};

export default RephraseSource;
