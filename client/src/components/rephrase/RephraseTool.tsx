import styled from '@emotion/styled';
import { ReactComponent as RephraseTextIcon } from 'src/assets/RephraseTextIcon.svg';
import { ReactComponent as RephraseFilesIcon } from 'src/assets/RephraseFilesIcon.svg';
import ActiveToolButton from 'src/components/rephrase/subcomponents/RephraseActiveToolButton';
import ToggleSwitch from 'src/components/ToggleSwitch';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import Card from 'src/components/general/card';
import RephraseToolCard from 'src/components/rephrase/subcomponents/RephraseToolCard';
import RephraseSource from './subcomponents/source';

/* ------------------------------- GridLayout ------------------------------- */
interface GridLayoutProps {
  isMobileLayout: boolean;
}

const GridLayout = styled('div')(
  (props: GridLayoutProps) => ` 
  padding-top: 18px; 
  padding-bottom: 56px; 
  display: grid;
  grid-gap: 8px;
  ${
    props.isMobileLayout
      ? 'grid-template-columns: 100%; grid-template-rows: repeat(2, 1fr) 58px;'
      : 'grid-template-columns: repeat(2, 1fr); grid-template-rows: 78px auto 58px;'
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

/* ------------------------------- CommentCard ------------------------------ */
interface CommentCardProps {
  gridArea: string;
}

const CommentCard = styled(Card)(
  (props: CommentCardProps) => `  
  display: flex; 
  width: calc(100% - 48px); 
  align-items: center;
  font-weight: 400;
  color: rgb(110, 110, 110);
  padding-left: 24px; 
  padding-right: 24px; 
  ${props.gridArea && `grid-area: ${props.gridArea};`} 
  `
);

/* -------------------------------------------------------------------------- */
/*                                RephraseTool                                */
/* -------------------------------------------------------------------------- */

const RephraseTool = () => {
  const activeBreakpoint = useBreakpoint();
  const isMobileLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  return (
    <GridLayout isMobileLayout={isMobileLayout}>
      {!isMobileLayout && (
        <ActiveToolsContainer gridArea='1 / 1 / 2 / 3'>
          <ActiveToolButton
            icon={<RephraseTextIcon />}
            text='Rephrase text'
            active
          />
          <ActiveToolButton
            icon={<RephraseFilesIcon />}
            text='Rephrase files'
            active={false}
          />
        </ActiveToolsContainer>
      )}
      <RephraseToolCard
        gridArea={isMobileLayout ? '1 / 1 / 2 / 2' : '2 / 1 / 3 / 2'}
        headerTitle='Input text'
        headerEndItem={<ToggleSwitch />}
      >
        <RephraseSource />
      </RephraseToolCard>
      <RephraseToolCard
        gridArea={isMobileLayout ? '2 / 1 / 3 / 2' : '2 / 2 / 3 / 3'}
        headerTitle='Rephrase'
      >
        {/* Rephrase target */}
      </RephraseToolCard>
      <CommentCard
        gridArea={isMobileLayout ? '3 / 1 / 4 / 2' : '3 / 1 / 4 / 3'}
      >
        Switch between Edit &amp; Rephrase mode to craft beautiful text.
      </CommentCard>
    </GridLayout>
  );
};

export default RephraseTool;
