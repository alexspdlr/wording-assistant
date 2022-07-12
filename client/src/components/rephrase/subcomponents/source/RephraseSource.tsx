import styled from '@emotion/styled';
import { RephraseInteractionMode } from 'src/types/rephrase';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useLocalStorage from 'src/utils/hooks/useLocalStorage';
import SourceHint from './subcomponents/SourceHint';
import SourceSelect from './subcomponents/SourceSelect';
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

interface RephraseSourceProps {
  activeMode: RephraseInteractionMode;
}

const RephraseSource = (props: RephraseSourceProps) => {
  const { activeMode } = props;
  const activeBreakpoint = useBreakpoint();
  const [value, setValue] = useLocalStorage('source-value', '');

  return (
    <Container>
      {activeMode === RephraseInteractionMode.Edit ? (
        <>
          <SourceHint
            hideHint={value ? value.length > 0 : false}
            activeBreakpoint={activeBreakpoint}
          />
          <SourceTextArea value={value} setValue={setValue} />
        </>
      ) : (
        <SourceSelect value={value} />
      )}
    </Container>
  );
};

export default RephraseSource;
