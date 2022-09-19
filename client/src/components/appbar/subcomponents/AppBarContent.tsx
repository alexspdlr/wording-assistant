import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';
import { ReactComponent as LogoLight } from 'src/assets/LogoLight.svg';
import { ReactComponent as LogoDark } from 'src/assets/LogoDark.svg';
import { ReactComponent as LogoText } from 'src/assets/LogoText.svg';
import AppBarItem from './AppBarItem';
import Button from 'src/components/general/button';
import Chip from 'src/components/general/chip';
import AppBarMenuButton from 'src/components/appbar/subcomponents/AppBarMenuButton';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { Breakpoint } from 'src/types/breakpoint';
import AppBarMenuDialog from './AppBarMenuDialog';
import { Link } from 'react-router-dom';
import AppBarExternalLink from './AppBarExternalLink';
import { useTheme } from '@emotion/react';
import useBoundStore from 'src/store';

/* ---------------------------- Styled components --------------------------- */

const PositionedLogoLight = styled(LogoLight)(
  () => `
  margin-bottom: -14px; 
  width: 52px;
  margin-right: 10px;
  cursor: pointer;
`
);
const PositionedLogoDark = styled(LogoDark)(
  () => `
  margin-bottom: -14px; 
  width: 52px;
  margin-right: 10px;
  cursor: pointer;
`
);

const PositionedLogoText = styled(LogoText)(
  () => `
  width: 66px;
  height: auto;
  margin-bottom: -6px;
  margin-right: 3px; 
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
  link: string;
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
    link: '/',
  },
  { content: 'Documentation', hideFromSize: '2XS', link: '/documentation' },
  { content: 'Process', hideFromSize: 'XS', link: '/process' },
  { content: 'About Me', hideFromSize: 'S', link: '/about-me' },
  {
    content: (
      <RepositoryAppBarItemContent>
        Repository
        <PositionedChip>GITHUB</PositionedChip>
      </RepositoryAppBarItemContent>
    ),
    hideFromSize: 'M',
    link: 'https://github.com',
  },
];

/* -------------------------------------------------------------------------- */
/*                                AppBarContent                               */
/* -------------------------------------------------------------------------- */

const AppBarContent = () => {
  const activeBreakpoint = useBreakpoint();
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const theme = useTheme();

  const setLightMode = useBoundStore((state) => state.setLightMode);
  const setDarkMode = useBoundStore((state) => state.setDarkMode);
  const colorMode = useBoundStore((state) => state.colorMode);

  return (
    <>
      <Left>
        <Link to='/'>
          {theme.activeMode === 'light' ? (
            <PositionedLogoLight />
          ) : (
            <PositionedLogoDark fill={theme.palette.text.light} />
          )}
        </Link>
        {navItems.map(
          (navItem, i) =>
            (navItem.hideFromSize
              ? compareBreakpoint(activeBreakpoint, '>', navItem.hideFromSize)
              : true) && (
              <>
                {navItem.link.includes('https') ? (
                  <AppBarExternalLink
                    key={`nav-item_${i}`}
                    href={navItem.link}
                    target='_blank'
                    isFirstItem={i === 0}
                    rel='noopener'
                  >
                    {navItem.content}
                  </AppBarExternalLink>
                ) : (
                  <AppBarItem
                    key={`nav-item_${i}`}
                    to={navItem.link}
                    isFirstItem={i === 0}
                  >
                    {navItem.content}
                  </AppBarItem>
                )}
              </>
            )
        )}
      </Left>
      <Right>
        {compareBreakpoint(activeBreakpoint, '>', '2XS') && (
          <Button onClick={colorMode === 'dark' ? setLightMode : setDarkMode}>
            {theme.activeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Button>
        )}
        <AppBarMenuButton onClick={() => setMenuDialogOpen(true)} />
      </Right>
      <AppBarMenuDialog open={menuDialogOpen} setOpen={setMenuDialogOpen} />
    </>
  );
};

export default AppBarContent;
