import styled from '@emotion/styled';
import { createRef, useEffect, useState } from 'react';
import DocumentationMenu from 'src/components/documentation/subcomponents/menu';
import introductionSection from 'src/content/documentation/introduction/Introduction';
import { testSection } from 'src/content/documentation/Test';
import { ContentSection, ContentSubSection } from 'src/types/content';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import DocumentationBody from './subcomponents/DocumentationBody';

export interface ActiveSectionState {
  activeSection: ContentSection | null;
  activeSubSection: ContentSubSection | null;
}

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {
  isSmallLayout: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    `  
    background-color:${defaultProps.theme.palette.background.main}; 
    width: 100%;
    border-top: 1px solid ${defaultProps.theme.palette.divider};
    border-bottom: 1px solid ${defaultProps.theme.palette.divider}; 
    display: flex;
    min-height: calc(100vh - 250px);
    flex-direction: ${props.isSmallLayout ? 'column' : 'row'};
    `
);

/* -------------------------------------------------------------------------- */
/*                                Documentation                               */
/* -------------------------------------------------------------------------- */

const Documentation = () => {
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const sections = [introductionSection, testSection];
  const [activeSectionState, setActiveSectionState] =
    useState<ActiveSectionState>({
      activeSection: sections[0],
      activeSubSection: null,
    });

  const [subSectionRefs, setSubSectionRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);

  useEffect(() => {
    const refArray = activeSectionState.activeSection?.subSections?.map(() =>
      createRef<HTMLDivElement>()
    );
    setSubSectionRefs(refArray || []);
  }, [activeSectionState.activeSection]);

  useEffect(() => {
    const activeSubsectionIndex =
      activeSectionState.activeSection?.subSections?.findIndex(
        (el) => el.id === activeSectionState.activeSubSection?.id
      );

    if (activeSubsectionIndex && subSectionRefs) {
      const taregtRef = subSectionRefs[activeSubsectionIndex];

      if (activeSubsectionIndex >= 0 && taregtRef?.current) {
        taregtRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }, [activeSectionState, subSectionRefs]);

  return (
    <Container isSmallLayout={isSmallLayout}>
      <DocumentationMenu
        sections={sections}
        activeSection={activeSectionState.activeSection}
        setActiveSectionState={setActiveSectionState}
        activeSubSection={activeSectionState.activeSubSection}
      />

      <DocumentationBody
        activeSection={activeSectionState.activeSection}
        subSectionRefs={subSectionRefs}
      />
    </Container>
  );
};

export default Documentation;
