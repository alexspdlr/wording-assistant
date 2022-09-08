import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Card from 'src/components/general/card';

/* --------------------------------- Header --------------------------------- */

const HeaderStyled = styled('div')(
  (props) => `  
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props.theme.palette.border};
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
  (props: ToolCardContainerProps) => (defaultProps) =>
    `  
      display: flex; 
      width: 100%;
      height: auto;
      flex-direction: column;
      border: 1px solid ${defaultProps.theme.palette.border};
      &:focus-within {
        border: 1px solid ${defaultProps.theme.palette.primary.main};
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
