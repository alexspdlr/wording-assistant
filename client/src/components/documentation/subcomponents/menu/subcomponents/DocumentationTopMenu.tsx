import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDownIcon.svg';

/* ---------------------------- Styled components --------------------------- */

const TopMenuContainer = styled('div')(
  () => ` 
        width: calc(100% - 39px); 
        border-bottom: 1px solid #F1F1F1;
        border-top: 1px solid #F1F1F1;
        padding: 10px 20px;
        color: #0f2b46;
        background-color: #ffffff;
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
  () => ` 
      top: 106px; 
      left: 0; 
      height: 100%;
      width: 100%; 
      position: fixed; 
        background-color: rgba(255,255,255,0.96);
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
