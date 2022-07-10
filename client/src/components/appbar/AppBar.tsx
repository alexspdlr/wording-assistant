import React, { useState } from 'react';
import styled from '@emotion/styled';
import useBreakpoint from '../../utils/hooks/useBreakpoint';
import useScrollPosition from '../../utils/hooks/useScrollPosition';
import pageMarginFromBreakpoint from '../../utils/pageMarginFromBreakpoint';
import Button from '../Button';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as LogoText } from '../../assets/LogoText.svg';
import NavItem from './NavItem';
import Chip from '../Chip';
import compareBreakpoint from '../../utils/compareBreakpoint';
import Dialog from '../Dialog';
import MenuIconButton from '../MenuIconButton';

interface AppBarStyledProps {
  horizontalPadding: number;
  isScrolledToTop: boolean;
}

const AppBarStyled = styled('div')(
  (props: AppBarStyledProps) => `
  background-color : rgba(255, 255, 255, 1);
  top: 0; 
  height: 60px; 
  display: flex; 
  justify-content: center; 
  position: fixed; 
  z-index: 10;  
  width: 100%; 
  padding-right: ${props.horizontalPadding}; 
  padding-left: ${props.horizontalPadding};   
  ${
    !props.isScrolledToTop && 'box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;'
  } 
  `
);

interface AppbarContainerProps {
  horizontalPadding: number;
}

const AppbarContainer = styled('div')(
  (props: AppbarContainerProps) => ` 
  max-width: 1400px; 
  height: 100%;  
  display: flex; 
  justify-content: space-between;  
  flex-direction: row;  
  height: 100%;
  width: calc(100% - ${2 * props.horizontalPadding}px);     
  `
);

const StyledLogo = styled(Logo)(
  (props) => `
  margin-bottom: -11px;
  width: 50px;
  margin-right: 10px;
  cursor: pointer;
`
);

const StyledLogoText = styled(LogoText)(
  (props) => `
  width: 66px;
  height: auto;
  margin-bottom: -6px;
  margin-right: 5px; 
`
);

const Left = styled('div')(
  (props) => `
display: flex; 
justify-content: flex-start;  
flex-direction: row;  
align-items: flex-end; 
height: 100%; 
font-weight: 500; 
`
);

const Right = styled('div')(
  (props) => `
display: flex; 
justify-content: flex-start;  
flex-direction: row;  
align-items: center; 
height: auto; 
font-weight: 500; 
gap: 22px; 
`
);

const WordingAssistantNavItem = () => (
  <NavItem isFirstItem>
    <div>
      <StyledLogoText />
      Wording Assistant
    </div>
  </NavItem>
);

const RepositoryNavItem = () => (
  <NavItem>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      }}
    >
      Repository
      <Chip>GITHUB</Chip>
    </div>
  </NavItem>
);

const AppBar = () => {
  const activeBreakpoint = useBreakpoint();
  const scrollPosition = useScrollPosition();
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  return (
    <AppBarStyled
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
      isScrolledToTop={scrollPosition === 0}
    >
      <AppbarContainer
        horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
      >
        <Left>
          <StyledLogo />

          <WordingAssistantNavItem />
          {compareBreakpoint(activeBreakpoint, '>', '2XS') && (
            <NavItem>Documentation</NavItem>
          )}
          {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
            <NavItem>Process</NavItem>
          )}
          {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
            <NavItem>Tech Stack</NavItem>
          )}
          {compareBreakpoint(activeBreakpoint, '>', 'M') && (
            <RepositoryNavItem />
          )}
        </Left>
        <Right>
          {compareBreakpoint(activeBreakpoint, '>', '2XS') && (
            <Button>Need help ?</Button>
          )}
          <MenuIconButton onClick={() => setMenuDialogOpen(true)} />
        </Right>
        <Dialog
          open={menuDialogOpen}
          onClose={() => setMenuDialogOpen(false)}
          transitionDuration={200}
          horizontalPosition='end'
          verticalPosition='start'
          darkenBackground={compareBreakpoint(activeBreakpoint, '<', '3XL')}
        >
          <p>
            hi there{' '}
            <button onClick={() => setMenuDialogOpen(false)}>close</button>
          </p>
        </Dialog>
      </AppbarContainer>
    </AppBarStyled>
  );
};

export default AppBar;
