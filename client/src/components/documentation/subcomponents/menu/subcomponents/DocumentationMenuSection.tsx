import styled from '@emotion/styled';
import { TextContentSubSection } from 'src/types/textContent';

/* ---------------------------- Styled components --------------------------- */

interface MenuContainerProps {
  isFirstSection: boolean;
  isLastSection: boolean;
  isSmallLayout: boolean;
}
const MenuContainer = styled('div')(
  (props: MenuContainerProps) => (defaultProps) =>
    ` 
    margin: ${props.isSmallLayout ? '0' : '0 40px 0 20px'};
    margin-top: ${props.isSmallLayout && props.isFirstSection ? '5px' : '0'};
    padding: ${props.isSmallLayout ? '0px 20px' : '20px 0'};
    border-bottom: ${
      props.isLastSection || props.isSmallLayout
        ? 'none'
        : `1px solid ${defaultProps.theme.palette.divider}`
    };
    `
);

interface MenuTitleProps {
  isActive: boolean;
  isSmallLayout: boolean;
}
const MenuTitle = styled('div')(
  (props: MenuTitleProps) => (defaultProps) =>
    ` 
    color: ${
      props.isActive
        ? defaultProps.theme.palette.tertiary.main
        : defaultProps.theme.palette.primary.light
    };
    padding: ${props.isSmallLayout ? '11px 0 0 ' : '5px 0'};
    font-size: ${props.isSmallLayout ? '16' : '19'}px;
    line-height: ${props.isSmallLayout ? '25' : '28'}px; 
    font-weight: ${props.isSmallLayout ? '400' : '500'};
    cursor: pointer;
    &:hover {
      color: ${
        props.isActive
          ? defaultProps.theme.palette.tertiary.main
          : defaultProps.theme.palette.primary.main
      };
    }
    `
);

interface MenuSubtitleProps {
  isSmallLayout: boolean;
  isActive: boolean;
}
const MenuSubtitle = styled('div')(
  (props: MenuSubtitleProps) => (defaultProps) =>
    ` 
      color: ${
        props.isActive
          ? defaultProps.theme.palette.tertiary.main
          : defaultProps.theme.palette.primary.light
      };
        padding: ${props.isSmallLayout ? '0px 20px' : '5px 20px'}; 
        font-size: 16px;
        font-weight: 500;
        line-height: 24px; 
        font-size: ${props.isSmallLayout ? '14' : '16'}px;
        line-height: ${props.isSmallLayout ? '22' : '24'}px; 
        font-weight: ${props.isSmallLayout ? '400' : '500'};
        cursor: pointer;
        &:hover { 
          color: ${
            props.isActive
              ? defaultProps.theme.palette.tertiary.main
              : defaultProps.theme.palette.primary.main
          };
        } 
        `
);

/* -------------------------------------------------------------------------- */
/*                          DocumentationMenuSection                          */
/* -------------------------------------------------------------------------- */

interface DocumentationMenuSectionProps {
  title: string;
  isFirstSection: boolean;
  isLastSection: boolean;
  isActive: boolean;
  isSmallLayout: boolean;
  subSections: TextContentSubSection[] | undefined;
  setActiveSection: () => void;
  setActiveSubSection: (subSection: TextContentSubSection) => void;
  activeSubSectionId: string | undefined;
}

const DocumentationMenuSection = (props: DocumentationMenuSectionProps) => {
  const {
    title,
    isFirstSection,
    isLastSection,
    isActive,
    isSmallLayout,
    activeSubSectionId,
    setActiveSection,
    setActiveSubSection,
    subSections,
  } = props;

  return (
    <MenuContainer
      isFirstSection={isFirstSection}
      isLastSection={isLastSection}
      isSmallLayout={isSmallLayout}
    >
      <MenuTitle
        isActive={isActive && !activeSubSectionId}
        isSmallLayout={isSmallLayout}
        onClick={setActiveSection}
      >
        {title}
      </MenuTitle>

      {subSections?.map((subSection) => (
        <MenuSubtitle
          key={subSection.id}
          isSmallLayout={isSmallLayout}
          isActive={activeSubSectionId === subSection.id}
          onClick={() => setActiveSubSection(subSection)}
        >
          {subSection.title}
        </MenuSubtitle>
      ))}
    </MenuContainer>
  );
};

export default DocumentationMenuSection;
