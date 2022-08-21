import styled from '@emotion/styled';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { RephraseInteractionMode } from 'src/types/rephrase';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useRephraseToolTextboxMinHeight from 'src/utils/hooks/useRephraseToolTextboxMinHeight';
import RephraseHint from '../RephraseHint';
import TargetSelect from './subcomponents/TargetSelect';

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

interface RephraseTargetProps {
  activeMode: RephraseInteractionMode;
}

const RephraseTarget = (props: RephraseTargetProps) => {
  const { activeMode } = props;
  const minHeight = useRephraseToolTextboxMinHeight();

  const rephrasedSentence = useBoundStore((state) => state.rephrasedSentence);
  const waitingForServer = useBoundStore((state) => state.waitingForServer);

  return (
    <Wrapper>
      <Container minHeight={minHeight}>
        {waitingForServer ? (
          <LoadingSpinner />
        ) : (
          <>
            {rephrasedSentence ? (
              <TargetSelect value={rephrasedSentence} />
            ) : (
              <>
                {activeMode === RephraseInteractionMode.Rephrase && (
                  <RephraseHint
                    hideHint={false}
                    title='Select a sentence to rephrase'
                    subtitle='Switch to Rephrase Mode to select a phrase. You can then rephrase it word by word. '
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default RephraseTarget;
