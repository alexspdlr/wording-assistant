import styled from '@emotion/styled';
import { ReactNode } from 'react';
import useBreakpoint from '../utils/hooks/useBreakpoint';
import useScrollPosition from '../utils/hooks/useScrollPosition';
import pageMarginFromBreakpoint from '../utils/pageMarginFromBreakpoint';

interface WrapperProps {
  horizontalPadding: number;
  isScrolledToTop: boolean;
}

const Wrapper = styled('div')(
  (props: WrapperProps) => `
  background-color : rgba(255, 255, 255, 1);
  top: 0; 
  height: 60px; 
  display: flex; 
  justify-content: center; 
  position: fixed; 
  z-index: 10;  
  width: 100%; 
  padding-right: ${props.horizontalPadding}; 
  padding-left: ${props.horizontalPadding};   
  ${
    !props.isScrolledToTop && 'box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;'
  } 
  `
);

interface ContainerProps {
  horizontalPadding: number;
}

const Container = styled('div')(
  (props: ContainerProps) => ` 
  max-width: 1400px; 
  height: 100%;  
  display: flex; 
  justify-content: space-between;  
  flex-direction: row;  
  height: 100%;
  width: calc(100% - ${2 * props.horizontalPadding}px);     
  `
);

interface AppBarLayoutProps {
  children: ReactNode;
}
const AppBarLayout = (props: AppBarLayoutProps) => {
  const { children } = props;
  const activeBreakpoint = useBreakpoint();
  const scrollPosition = useScrollPosition();
  return (
    <Wrapper
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
      isScrolledToTop={scrollPosition === 0}
    >
      <Container horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        {children}
      </Container>
    </Wrapper>
  );
};

export default AppBarLayout;
