import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useLocalStorage from 'src/utils/hooks/useLocalStorage';
import SourceHint from './subcomponents/SourceHint';
import SourceTextArea from './subcomponents/SourceTextArea';

const Container = styled('div')(
  () => `
  width: 100%;
  display: flex;
  align-content: stretch;
  align-items: stretch;
  position: relative;
  `
);

const RephraseSource = () => {
  const activeBreakpoint = useBreakpoint();
  const [value, setValue] = useLocalStorage('source-value', '');

  return (
    <Container>
      <SourceHint
        hideHint={value ? value.length > 0 : false}
        activeBreakpoint={activeBreakpoint}
      />
      <SourceTextArea value={value} setValue={setValue} />
    </Container>
  );
};

export default RephraseSource;
