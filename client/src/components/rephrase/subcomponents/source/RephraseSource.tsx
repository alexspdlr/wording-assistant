import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import copyToClipboard from 'src/utils/copyToClipboard';
import SourceCopyButton from './subcomponents/SourceCopyButton';
import RephraseHint from '../RephraseHint';
import SourceSelect from './subcomponents/SourceSelect';
import SourceTextArea from './subcomponents/SourceTextArea';
import { useSearchParams } from 'react-router-dom';
import useBoundStore from 'src/store';
import useClickAway from 'src/utils/hooks/useClickAway';

const Wrapper = styled('div')(
  () => `
  width: 100%;
  display: flex;
  align-content: stretch;
  align-items: stretch;
  position: relative;  
  height: 100%;
  `
);

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  flex-grow: 1; 
  position: relative;
  display: flex;
  `
);

interface RephraseSourceProps {}

const RephraseSource = (props: RephraseSourceProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const isMobileDevice = false;

  const generateRephrasingBase = useBoundStore(
    (state) => state.generateRephrasingBase
  );

  useEffect(() => {
    const listener = () => {
      const selection = window.getSelection();
      const selectionString = selection?.toString();

      const targetNode = document.getElementById('source-value-input');

      const isSourceInput = selection?.anchorNode?.contains(targetNode);

      if (isSourceInput && selectionString && selectionString.length > 0) {
        if (selection) generateRephrasingBase(selection.toString());
      }
    };

    window.addEventListener('mouseup', listener);

    return () => {
      window.removeEventListener('mouseup', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Container>
        {isMobileDevice ? (
          <>
            <SourceSelect value={value || ''} />
          </>
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
