import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Card from 'src/components/general/card';

/* --------------------------------- Header --------------------------------- */

const HeaderStyled = styled('div')(
  () => `  
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F1F1F1;
    padding-left: 24px;
    padding-right: 24px;
    font-weight: 600;
        `
);

interface HeaderProps {
  title: string;
  endItem?: ReactNode;
}

const Header = (props: HeaderProps) => {
  const { title, endItem } = props;
  return (
    <HeaderStyled>
      {title} {endItem || <></>}
    </HeaderStyled>
  );
};

/* ---------------------------- ToolCardContainer --------------------------- */

interface ToolCardContainerProps {
  gridArea: string;
}

const ToolCardContainer = styled(Card)(
  (props: ToolCardContainerProps) => `  
      display: flex; 
      width: 100%;
      height: auto;
      flex-direction: column;
      &:focus-within {
        border: 1px solid rgb(0, 99, 149);
      }
      ${props.gridArea && `grid-area: ${props.gridArea};`} 
      `
);

/* -------------------------------------------------------------------------- */
/*                                  ToolCard                                  */
/* -------------------------------------------------------------------------- */

interface RephraseToolCardProps {
  children: ReactNode;
  gridArea: string;
  headerTitle: string;
  headerEndItem?: ReactNode;
}

const RephraseToolCard = (props: RephraseToolCardProps) => {
  const { gridArea, children, headerTitle, headerEndItem } = props;
  return (
    <ToolCardContainer gridArea={gridArea} tabIndex={0}>
      <Header title={headerTitle} endItem={headerEndItem} />
      {children}
    </ToolCardContainer>
  );
};

export default RephraseToolCard;
