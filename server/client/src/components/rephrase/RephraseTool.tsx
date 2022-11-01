import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as RephraseFilesIcon } from 'src/assets/RephraseFilesIcon.svg';
import { ReactComponent as RephraseTextIcon } from 'src/assets/RephraseTextIcon.svg';
import Card from 'src/components/general/card';
import ActiveToolButton from 'src/components/rephrase/subcomponents/RephraseActiveToolButton';
import RephraseToolCard from 'src/components/rephrase/subcomponents/RephraseToolCard';
import useBoundStore from 'src/store';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import Dialog from '../general/dialog';
import Snackbar from '../general/snackbar';
import RephraseToolLayout from './subcomponents/RephraseToolLayout';
import RephraseSource from './subcomponents/source';
import RephraseTarget from './subcomponents/target/RephraseTarget';

/* ------------------------------- GridLayout ------------------------------- */
interface GridLayoutProps {
  isMobileLayout: boolean;
}

const GridLayout = styled('div')(
  (props: GridLayoutProps) => ` 
  padding-top: 24px; 
  padding-bottom: 56px; 
  display: grid;
  grid-row-gap: 8px;

  ${
    props.isMobileLayout
      ? 'grid-template-columns: 100%; grid-template-rows: repeat(2, 1fr) 58px;'
      : 'grid-template-columns: 1fr; grid-template-rows: repeat(3, auto);'
  } 
  `
);

/* -------------------------- ActiveToolsContainer -------------------------- */

interface ActiveToolsContainerProps {
  gridArea: string;
}

const ActiveToolsContainer = styled('div')(
  (props: ActiveToolsContainerProps) => `  
    display: flex;
    gap: 10px;  
    grid-area: ${props.gridArea};
    `
);

/* ---------------------------- SnackbarContainer --------------------------- */

const SnackbarContainer = styled('div')(
  () => `  
    padding-top: 18px; 
    `
);

/* ------------------------------- CommentCard ------------------------------ */
interface CommentCardProps {
  gridArea: string;
}

const CommentCard = styled(Card)(
  (props: CommentCardProps) => (defaultProps) =>
    `  
  display: flex; 
  width: calc(100% - 48px); 
  align-items: center;
  font-weight: 400;
  color: ${defaultProps.theme.palette.text.disabled};
  padding: 18px 24px;
  border: 1px solid ${defaultProps.theme.palette.border};
  font-size: 16.1px; 
  height: 20px; 
  ${props.gridArea && `grid-area: ${props.gridArea};`}  
  `
);

/* ------------------------------- RephraseToolSection ------------------------------ */
interface RephraseToolSectionProps {
  isMobileLayout: boolean;
}

const RephraseToolSection = (props: RephraseToolSectionProps) => {
  const { isMobileLayout } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const sourceValue = searchParams.get('source-value');

  if (isMobileLayout) {
    return (
      <>
        <RephraseToolCard
          gridArea='1 / 1 / 2 / 2'
          headerTitle='Enter your text'
          isSource
          isMobileLayout={isMobileLayout}
        >
          <RephraseSource />
        </RephraseToolCard>
        <RephraseToolCard
          isMobileLayout={isMobileLayout}
          gridArea='2 / 1 / 3 / 2'
          headerTitle='Paraphrase'
          isSource={false}
        >
          <RephraseTarget />
        </RephraseToolCard>
      </>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        borderRadius: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
        marginTop: '10px',

        height: '60vh',
        maxHeight: sourceValue && sourceValue.length > 0 ? 'none' : '600px',
      }}
    >
      <RephraseToolCard
        isMobileLayout={isMobileLayout}
        gridArea='2 / 1 / 3 / 2'
        headerTitle='Enter your text'
        isSource
      >
        <RephraseSource />
      </RephraseToolCard>
      <RephraseToolCard
        isMobileLayout={isMobileLayout}
        gridArea='2 / 2 / 3 / 3'
        headerTitle='Paraphrase'
        isSource={false}
      >
        <RephraseTarget />
      </RephraseToolCard>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                RephraseTool                                */
/* -------------------------------------------------------------------------- */

const RephraseTool = () => {
  const activeBreakpoint = useBreakpoint();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const [rephraseFilesDialogOpen, setRephraseFilesDialogOpen] =
    useState<boolean>(false);

  const isErrorActive = useBoundStore((state) => state.isErrorActive);

  const isConnectedToServer = useBoundStore(
    (state) => state.isConnectedToServer
  );

  return (
    <>
      {(isErrorActive || !isConnectedToServer) && (
        <SnackbarContainer>
          <Snackbar
            variant='error'
            message={
              !isConnectedToServer
                ? 'The server cannot be reached. Please make sure you are connect to the internet & reload the page.'
                : 'Sorry, something went wrong. Please reload the page or try again later.'
            }
          />
        </SnackbarContainer>
      )}
      <GridLayout isMobileLayout={isMobileLayout}>
        {!isMobileLayout && (
          <ActiveToolsContainer gridArea='1 / 1 / 2 / 3'>
            <ActiveToolButton
              icon={<RephraseTextIcon />}
              text='Rephrase text'
              subtitle='29 languages'
              active
            />
            <ActiveToolButton
              icon={<RephraseFilesIcon />}
              text='Rephrase files'
              subtitle='.pdf, .docx, .pptx'
              active={false}
              onClick={() => setRephraseFilesDialogOpen(true)}
            />
          </ActiveToolsContainer>
        )}

        {/*  <RephraseToolSection isMobileLayout={isMobileLayout} /> */}
        <RephraseToolLayout />

        <CommentCard
          gridArea={isMobileLayout ? '3 / 1 / 4 / 2' : '3 / 1 / 4 / 3'}
        >
          Switch between Edit &amp; Rephrase mode to craft beautiful text.
        </CommentCard>
      </GridLayout>

      <Dialog
        open={rephraseFilesDialogOpen}
        onClose={() => setRephraseFilesDialogOpen(false)}
        transitionDuration={100}
        horizontalPosition='center'
        verticalPosition='center'
        darkenBackground
      >
        <div
          style={{ padding: 50, color: 'white', fontSize: 36, fontWeight: 500 }}
        >
          Coming soon
        </div>
      </Dialog>
    </>
  );
};

export default RephraseTool;
