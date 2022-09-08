import styled from '@emotion/styled';
import { ReactNode } from 'react';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useScrollPosition from 'src/utils/hooks/useScrollPosition';
import pageMarginFromBreakpoint from 'src/utils/pageMarginFromBreakpoint';

/* -------------------------------- Container ------------------------------- */

interface ContainerProps {
  horizontalPadding: number;
  isScrolledToTop: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    ` 
  background-color : ${defaultProps.theme.palette.background.light};
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

/* -------------------------------- Layout ------------------------------- */

interface LayoutProps {
  horizontalPadding: number;
}

const Layout = styled('div')(
  (props: LayoutProps) => ` 
  max-width: 1400px; 
  height: 100%;  
  display: flex; 
  justify-content: space-between;  
  flex-direction: row;  
  height: 100%;
  width: calc(100% - ${2 * props.horizontalPadding}px);     
  `
);

/* -------------------------------------------------------------------------- */
/*                               AppBarContainer                              */
/* -------------------------------------------------------------------------- */

interface AppBarContainerProps {
  children: ReactNode;
}
const AppBarContainer = (props: AppBarContainerProps) => {
  const { children } = props;
  const activeBreakpoint = useBreakpoint();
  const scrollPosition = useScrollPosition();
  return (
    <Container
      horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
      isScrolledToTop={scrollPosition === 0}
    >
      <Layout horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}>
        {children}
      </Layout>
    </Container>
  );
};

export default AppBarContainer;
