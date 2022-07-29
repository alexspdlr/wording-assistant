import styled from '@emotion/styled';
import { ReactNode } from 'react';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import pageMarginFromBreakpoint from 'src/utils/pageMarginFromBreakpoint';

interface WrapperProps {
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
}
const Section = (props: SectionProps) => {
  const { children, backgroundColor } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper
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
