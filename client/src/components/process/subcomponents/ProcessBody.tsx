import styled from '@emotion/styled';
import Content from 'src/components/general/text-content';
import { Breakpoint } from 'src/types/breakpoint';
import { TextContentSection } from 'src/types/textContent';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';

/* ---------------------------------- Utils --------------------------------- */

const paddingRightByBreakpoint = (activeBreakpoint: Breakpoint) => {
  if (compareBreakpoint(activeBreakpoint, '>', 'L')) {
    return 400;
  }

  if (compareBreakpoint(activeBreakpoint, '>', 'S')) {
    return 100;
  }

  return 0;
};

/* ---------------------------- Styled components --------------------------- */

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

interface SectionContainerProps {
  isSmallLayout: boolean;
  paddingRight: number;
  windowWidth: number;
}
const SectionContainer = styled('div')(
  (props: SectionContainerProps) => `  
          max-width: 1140px;
          margin-left: ${
            props.windowWidth > 1816 ? 'calc((100vw - 1816px) / 2)' : '0px'
          };
          padding: ${
            props.isSmallLayout
              ? '20px'
              : `40px ${props.paddingRight + 40}px 40px 40px`
          };
      `
);

// +-10px is used to offset autoscrolling vertically by 10px
const SubSectionContainer = styled('div')(
  () => `  
    padding-top: 10px;
    margin-top: -10px;
            `
);

/* -------------------------------------------------------------------------- */
/*                                 ProcessBody                                */
/* -------------------------------------------------------------------------- */

interface ProcessBodyProps {
  activeSection: TextContentSection | null;
  subSectionRefs: React.RefObject<HTMLDivElement>[];
}

const ProcessBody = (props: ProcessBodyProps) => {
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

export default ProcessBody;
