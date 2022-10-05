import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'src/components/general/loading-spinner';
import useBoundStore from 'src/store';
import { ActiveWorkerState } from 'src/types/socket';
import { ClientWorkerState, UiExpectedResponse } from 'src/types/store';
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
  const targetText = useBoundStore((state) => state.uiState.targetText);
  const expectedResponse: UiExpectedResponse | null = useBoundStore(
    (state) => state.uiState.expectedResponse
  );

  const showLoadingSpinner = () =>
    expectedResponse && expectedResponse.endpoint === 'selectText';
  const showHint = () =>
    (expectedResponse && expectedResponse.endpoint === 'deselectText') ||
    !targetText;

  return (
    <Wrapper>
      <Container>
        {showLoadingSpinner() ? (
          <div style={{ padding: '24px 32px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {showHint() ? (
              <>
                {value && value.length > 0 && (
                  <RephraseHint
                    hideHint={false}
                    title='Switch to Rephrase Mode'
                    subtitle='Switch to Rephrase Mode to select a phrase. You can then rephrase it word by word.'
                  />
                )}
              </>
            ) : (
              <TargetSelect value={targetText || ''} />
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default RephraseTarget;
