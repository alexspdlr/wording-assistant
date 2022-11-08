import styled from '@emotion/styled';
import Content from 'src/components/general/content';
import { Breakpoint } from 'src/types/breakpoint';
import { ContentSection } from 'src/types/content';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';

/* ---------------------------------- utils --------------------------------- */

const paddingRightByBreakpoint = (activeBreakpoint: Breakpoint) => {
  if (compareBreakpoint(activeBreakpoint, '>', 'L')) {
    return 300;
  }

  if (compareBreakpoint(activeBreakpoint, '>', 'S')) {
    return 100;
  }

  return 0;
};

/* --------------------------------- Wrapper -------------------------------- */

interface WrapperProps {
  isSmallLayout: boolean;
  activeBreakpoint: Breakpoint;
}

const Wrapper = styled('div')(
  (props: WrapperProps) => `  
    display:flex;
    flex-direction: column;
    align-items: stretch;
    width: ${props.isSmallLayout ? '100%' : `calc(100% - 300px)`};
      `
);

/* -------------------------------- SectionContainer ------------------------------- */

interface ContainerProps {
  isSmallLayout: boolean;
  paddingRight: number;
  windowWidth: number;
}

const SectionContainer = styled('div')(
  (props: ContainerProps) => `  
          max-width: 1140px;
          margin-left: ${
            props.windowWidth > 1816 ? 'calc((100vw - 1816px) / 2)' : '0px'
          };
          padding: ${
            props.isSmallLayout
              ? '20px'
              : `30px ${props.paddingRight + 30}px 30px 30px`
          };
      `
);

/* ----------------------------- SubSectionContainer ----------------------------- */

/* +-10px is used to offset autoscrolling vertically by 10px */
const SubSectionContainer = styled('div')(
  () => `  
    padding-top: 10px;
    margin-top: -10px;
            `
);

/* -------------------------------------------------------------------------- */
/*                              DocumentationBody                             */
/* -------------------------------------------------------------------------- */

interface DocumentationBodyProps {
  activeSection: ContentSection | null;
  subSectionRefs: React.RefObject<HTMLDivElement>[];
}

const DocumentationBody = (props: DocumentationBodyProps) => {
  const { activeSection, subSectionRefs } = props;
  const activeBreakpoint = useBreakpoint();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const windowWidth = useWindowWidth();

  return (
    <Wrapper isSmallLayout={isSmallLayout} activeBreakpoint={activeBreakpoint}>
      <SectionContainer
        isSmallLayout={isSmallLayout}
        paddingRight={paddingRightByBreakpoint(activeBreakpoint)}
        windowWidth={windowWidth}
      >
        {activeSection && (
          <Content
            type='section'
            title={activeSection.title}
            bodyItems={activeSection.body}
          />
        )}

        {activeSection?.subSections &&
          activeSection.subSections.map((subSection, index) => (
            <SubSectionContainer key={index} ref={subSectionRefs[index]}>
              <Content
                type='subsection'
                title={subSection.title}
                bodyItems={subSection.body}
              />
            </SubSectionContainer>
          ))}
      </SectionContainer>
    </Wrapper>
  );
};

export default DocumentationBody;
