import styled from '@emotion/styled';
import { ReactNode } from 'react';
import useBreakpoint from '../../utils/hooks/useBreakpoint';
import pageMarginFromBreakpoint from '../../utils/pageMarginFromBreakpoint';

interface WrapperProps {
  horizontalPadding: number;
}
const Wrapper = styled('div')(
  (props: WrapperProps) => `
  background-color: #f7f7f7;   
  margin-top: 60px;
  display: flex; 
  justify-content: center; 
  width: 100%;  
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

interface AppBodyProps {
  children: ReactNode;
}
const AppBody = (props: AppBodyProps) => {
  const { children } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Wrapper horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        {children}
      </Container>
    </Wrapper>
  );
};

export default AppBody;
