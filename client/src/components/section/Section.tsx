import styled from '@emotion/styled';
import { ReactNode } from 'react';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import pageMarginFromBreakpoint from 'src/utils/pageMarginFromBreakpoint';

interface WrapperProps {
  isFirstSection: boolean;
  backgroundColor: string;
  horizontalPadding: number;
}
const Wrapper = styled('div')(
  (props: WrapperProps) => ` 
  display: flex; 
  justify-content: center; 
  width: 100%;  
  background-color: ${props.backgroundColor};
  padding-right: ${props.horizontalPadding};  
  padding-left: ${props.horizontalPadding};   
  margin-top: ${props.isFirstSection ? '60px' : '0px'};
  `
);

interface ContainerProps {
  horizontalPadding: number;
}
const Container = styled('div')(
  (props: ContainerProps) => ` 
  max-width: 1400px; 
  width: calc(100% - ${2 * props.horizontalPadding}px); 
  `
);

interface SectionProps {
  backgroundColor: string;
  children: ReactNode;
  isFirstSection?: boolean;
}
const Section = (props: SectionProps) => {
  const { children, backgroundColor, isFirstSection } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper
      isFirstSection={isFirstSection || false}
      backgroundColor={backgroundColor}
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
    >
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        {children}
      </Container>
    </Wrapper>
  );
};

export default Section;
