import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';
import { ReactComponent as Logo } from 'src/assets/Logo.svg';
import { ReactComponent as LogoText } from 'src/assets/LogoText.svg';
import AppBarItem from './AppBarItem';
import Button from 'src/components/Button';
import Chip from 'src/components/Chip';
import MenuIconButton from 'src/components/MenuIconButton';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { Breakpoint } from 'src/types/breakpoint';
import AppBarMenuDialog from './AppBarMenuDialog';
import { red } from '@mui/material/colors';

/* ---------------------------- Styled components --------------------------- */

const PositionedLogo = styled(Logo)(
  () => `
  margin-bottom: -11px; 
  width: 50px;
  margin-right: 10px;
  cursor: pointer;
`
);

const PositionedLogoText = styled(LogoText)(
  () => `
  width: 66px;
  height: auto;
  margin-bottom: -6px;
  margin-right: 5px; 
`
);

const Left = styled('div')(
  () => `
  display: flex; 
  justify-content: flex-start;  
  flex-direction: row;  
  align-items: flex-end; 
  height: 100%; 
  font-weight: 500; 
`
);

const Right = styled('div')(
  () => `
  display: flex; 
  justify-content: flex-start;  
  flex-direction: row;  
  align-items: center; 
  height: auto; 
  font-weight: 500; 
  gap: 22px; 
`
);

const PositionedChip = styled(Chip)(
  () => `
  margin-left: 6px;
  margin-bottom: -3px; 
  `
);

const RepositoryAppBarItemContent = styled('div')(
  () => `
  display: flex;
  justify-content: flex-start;
  align-items: flex-end; 
  `
);

/* -------------------------------- navItems -------------------------------- */

interface AppBarItemProps {
  content: string | ReactNode;
  hideFromSize?: Breakpoint;
}

const navItems: AppBarItemProps[] = [
  {
    content: (
      <>
        <PositionedLogoText />
        Wording Assistant
      </>
    ),
  },
  { content: 'Documentation', hideFromSize: '2XS' },
  { content: 'Process', hideFromSize: 'XS' },
  { content: 'Tech Stack', hideFromSize: 'S' },
  {
    content: (
      <RepositoryAppBarItemContent>
        Repository
        <PositionedChip>GITHUB</PositionedChip>
      </RepositoryAppBarItemContent>
    ),
    hideFromSize: 'M',
  },
];

/* -------------------------------------------------------------------------- */
/*                                AppBarContent                               */
/* -------------------------------------------------------------------------- */

const AppBarContent = () => {
  const activeBreakpoint = useBreakpoint();
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);

  return (
    <>
      <Left>
        <PositionedLogo />
        {navItems.map(
          (navItem, i) =>
            (navItem.hideFromSize
              ? compareBreakpoint(activeBreakpoint, '>', navItem.hideFromSize)
              : true) && (
              <AppBarItem isFirstItem={i === 0}>{navItem.content}</AppBarItem>
            )
        )}
      </Left>
      <Right>
        {compareBreakpoint(activeBreakpoint, '>', '2XS') && (
          <Button>Need help ?</Button>
        )}
        <MenuIconButton onClick={() => setMenuDialogOpen(true)} />
      </Right>
      <AppBarMenuDialog open={menuDialogOpen} setOpen={setMenuDialogOpen} />
    </>
  );
};

export default AppBarContent;
