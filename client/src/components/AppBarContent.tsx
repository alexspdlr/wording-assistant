import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as LogoText } from '../assets/LogoText.svg';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Dialog from '../components/Dialog';
import MenuIconButton from '../components/MenuIconButton';
import NavItem from '../components/NavItem';
import compareBreakpoint from '../utils/compareBreakpoint';
import useBreakpoint from '../utils/hooks/useBreakpoint';

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

const AppBarContent = () => {
  const activeBreakpoint = useBreakpoint();
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  return (
    <>
      <Left>
        <StyledLogo />

        <WordingAssistantNavItem />
        {compareBreakpoint(activeBreakpoint, '>', '2XS') && (
          <NavItem>Documentation</NavItem>
        )}
        {compareBreakpoint(activeBreakpoint, '>', 'XS') && (
          <NavItem>Process</NavItem>
        )}
        {compareBreakpoint(activeBreakpoint, '>', 'S') && (
          <NavItem>Tech Stack</NavItem>
        )}
        {compareBreakpoint(activeBreakpoint, '>', 'M') && <RepositoryNavItem />}
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
        {/* TODO: Replace example menu with menu component */}
        <p style={{ height: 700, width: 340 }}>
          hi there{' '}
          <button onClick={() => setMenuDialogOpen(false)}>close</button>
        </p>
      </Dialog>
    </>
  );
};

export default AppBarContent;
