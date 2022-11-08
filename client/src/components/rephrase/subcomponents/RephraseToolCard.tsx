import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Card from 'src/components/general/card';
import isMobileDevice from 'src/utils/isMobileDevice';
import { isMap } from 'util/types';

/* --------------------------------- Header --------------------------------- */

interface HeaderStyledProps {
  isSource: boolean;
  isMobileLayout: boolean;
}

const HeaderStyled = styled('div')(
  (props: HeaderStyledProps) => (defaultProps) =>
    `  
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 19px 12px 19px 24px;
    font-weight: 600;
    border-right: ${
      props.isSource && `1px solid ${defaultProps.theme.palette.border}`
    };
    border: 1px solid ${defaultProps.theme.palette.border};
    border-right: ${props.isSource && !props.isMobileLayout && 'none'};
    border-left: ${!props.isSource && !props.isMobileLayout && 'none'};
    border-bottom: none; 
    border-radius: ${
      props.isSource
        ? `${props.isMobileLayout ? '8px 8px 0px 0px' : '8px 0px 0px 0px'}`
        : `${props.isMobileLayout ? '8px 8px 0px 0px' : '0px 8px 0px 0px'}`
    }; 

        `
);

interface HeaderProps {
  title: string;
  isSource: boolean;
  isMobileLayout: boolean;
  endItem?: ReactNode;
}

const Header = (props: HeaderProps) => {
  const { title, endItem, isSource, isMobileLayout } = props;
  return (
    <HeaderStyled isSource={isSource} isMobileLayout={isMobileLayout}>
      {title} {endItem || <></>}
    </HeaderStyled>
  );
};

/* ---------------------------- Body --------------------------- */

interface BodyProps {
  isSource: boolean;
  isMobileLayout: boolean;
}

const Body = styled('div')(
  (props: BodyProps) => (defaultProps) =>
    `    
  border-right: ${
    props.isSource && `1px solid ${defaultProps.theme.palette.border}`
  };
  border: 1px solid ${defaultProps.theme.palette.border};
  border-right: ${
    props.isSource && !props.isMobileLayout && '1px solid transparent'
  };
  display: flex; 
  flex-grow: 1;
  border-radius: ${
    props.isSource
      ? `${props.isMobileLayout ? '0px 0px 8px 8px' : '0px 0px 0px 8px'}`
      : `${props.isMobileLayout ? '0px 0px 8px 8px' : '0px 0px 8px 0px'}`
  }; 
  &:focus-within {
    border: 1px solid ${defaultProps.theme.palette.primary.light};
  }

  transition: border 150ms linear;
        `
);

/* ---------------------------- ToolCardContainer --------------------------- */

interface ToolCardContainerProps {
  gridArea: string;
  isSource: boolean;
  isMobileLayout: boolean;
}

const ToolCardContainer = styled(Card)(
  (props: ToolCardContainerProps) => (defaultProps) =>
    `  
      display: flex; 
      width: 100%;  
      flex-direction: column; 
      box-shadow: ${!props.isMobileLayout && 'none'}; 
      border: none; 
      border-radius: ${props.isSource ? '8px 0px 0px 8px' : '0px 8px 8px 0px'};
      border-radius: ${props.isMobileLayout && '8px'}; 
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
  isSource: boolean;
  isMobileLayout: boolean;
  headerEndItem?: ReactNode;
}

const RephraseToolCard = (props: RephraseToolCardProps) => {
  const {
    gridArea,
    children,
    headerTitle,
    headerEndItem,
    isSource,
    isMobileLayout,
  } = props;
  return (
    <ToolCardContainer
      gridArea={gridArea}
      tabIndex={0}
      isSource={isSource}
      isMobileLayout={isMobileLayout}
    >
      <Header
        title={headerTitle}
        endItem={headerEndItem}
        isSource={isSource}
        isMobileLayout={isMobileLayout}
      />
      <Body isSource={isSource} isMobileLayout={isMobileLayout}>
        {children}
      </Body>
    </ToolCardContainer>
  );
};

export default RephraseToolCard;
