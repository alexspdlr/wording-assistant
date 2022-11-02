import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDownIcon.svg';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

/* ---------------------------- Styled components --------------------------- */

const TopMenuContainer = styled('div')(
  (props) => ` 
        width: calc(100% - 39px); 
        border-bottom: 1px solid ${props.theme.palette.divider};
        border-top: 1px solid ${props.theme.palette.divider};
        padding: 10px 20px;
        color: ${props.theme.palette.primary.main};
        background-color: ${props.theme.palette.background.main};
        font-weight: 700; 
        display: flex; 
        align-items: stretch; 
        cursor: pointer; 
        line-height: 24px; 
        z-index: 1;
        position: fixed;
        top: 60px; 
        `
);

const TopMenuOverlay = styled('div')(
  (props) => ` 
      top: 106px; 
      left: 0; 
      height: 100%;
      width: 100%; 
      position: fixed; 
        background-color: ${addAlphaToHexColor(
          props.theme.palette.background.main,
          0.96
        )};
        `
);

/* -------------------------------------------------------------------------- */
/*                            DocumentationTopMenu                            */
/* -------------------------------------------------------------------------- */

interface DocumentationTopMenuProps {
  activePage: string;
  children?: ReactNode;
}

const DocumentationTopMenu = (props: DocumentationTopMenuProps) => {
  const { activePage, children } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <TopMenuContainer onClick={() => setMenuOpen(!menuOpen)}>
        {activePage}
        {menuOpen ? (
          <ArrowDownIcon
            style={{
              cursor: 'pointer',
              transform: 'rotate(180deg)',
            }}
          />
        ) : (
          <ArrowDownIcon />
        )}
        {menuOpen && <TopMenuOverlay>{children}</TopMenuOverlay>}
      </TopMenuContainer>
    </>
  );
};

export default DocumentationTopMenu;
