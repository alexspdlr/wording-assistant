import {
  TextContentSection,
  TextContentSubSection,
} from 'src/types/textContent';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ActiveSectionState } from '../../Documentation';
import DocumentationMenuSection from './subcomponents/DocumentationMenuSection';
import DocumentationSideMenu from './subcomponents/DocumentationSideMenu';
import DocumentationTopMenu from './subcomponents/DocumentationTopMenu';

/* -------------------------------------------------------------------------- */
/*                                 DocumentationMenu                          */
/* -------------------------------------------------------------------------- */

interface DocumentationMenuProps {
  sections: TextContentSection[];
  activeSection: TextContentSection | null;
  setActiveSectionState: (data: ActiveSectionState) => void;
  activeSubSection: TextContentSubSection | null;
}

const DocumentationMenu = (props: DocumentationMenuProps) => {
  const { sections, activeSection, setActiveSectionState, activeSubSection } =
    props;
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'S');

  const menuItems = (
    <>
      {sections.map((section, index) => (
        <DocumentationMenuSection
          key={section.id}
          title={section.title}
          isFirstSection={index === 0}
          subSections={section.subSections}
          isLastSection={index === sections.length - 1}
          isSmallLayout={isSmallLayout}
          isActive={activeSection ? activeSection.id === section.id : false}
          setActiveSection={() =>
            setActiveSectionState({
              activeSection: section,
              activeSubSection: null,
            })
          }
          setActiveSubSection={(subSection: TextContentSubSection) => {
            setActiveSectionState({
              activeSection: section,
              activeSubSection: subSection,
            });
          }}
          activeSubSectionId={activeSubSection?.id}
        />
      ))}
    </>
  );

  return (
    <>
      {isSmallLayout ? (
        <DocumentationTopMenu
          activePage={
            sections.find((section) => section.id === activeSection?.id)
              ?.title || sections[0].title
          }
        >
          {menuItems}
        </DocumentationTopMenu>
      ) : (
        <DocumentationSideMenu>{menuItems}</DocumentationSideMenu>
      )}
    </>
  );
};

export default DocumentationMenu;
