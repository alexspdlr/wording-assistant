import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { ActiveWorkerState } from 'src/types/socket';
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

interface ContainerProps {}

const Container = styled('div')(
  (props: ContainerProps) => `
  padding: 0; 
  flex-grow: 1; 
  position: relative;
  display: flex; 
  `
);

interface RephraseTargetProps {}

const RephraseTarget = (props: RephraseTargetProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const targetText = useBoundStore(
    (state) =>
      state.activeWorkerState !== 'disconnected' &&
      state.activeWorkerState.data.targetText
  );
  const activeWorkerState: ActiveWorkerState | 'disconnected' = useBoundStore(
    (state) => state.activeWorkerState
  );

  return (
    <Wrapper>
      <Container>
        {activeWorkerState !== 'disconnected' &&
        activeWorkerState.stateName === 'processingSelectText' ? (
          <div style={{ padding: '24px 32px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {targetText ? (
              <TargetSelect value={targetText} />
            ) : (
              <>
                {value && value.length > 0 && (
                  <RephraseHint
                    hideHint={false}
                    title='Switch to Rephrase Mode'
                    subtitle='Switch to Rephrase Mode to select a phrase. You can then rephrase it word by word.'
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
