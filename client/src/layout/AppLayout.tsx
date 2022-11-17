import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AppBar from 'src/components/appbar';
import Footer from 'src/components/footer';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';

const Container = styled('div')(
  () => `  
    width: 100%;
    height: 100%;
    overflowX: hidden;  
    `
);

const Body = styled('div')(
  () => `  
    margin-top: 60px;  
    `
);

interface GlobalMinWidthProps {
  width: number;
}

const GlobalMinWidth = styled('div')(
  (props: GlobalMinWidthProps) => `
  min-width: 650px; 
  overflow-x: ${props.width < 651 ? 'scroll' : 'auto'};
`
);

const AppLayout = () => {
  const windowWidth = useWindowWidth();
  return (
    <GlobalMinWidth width={windowWidth}>
      <Container>
        <AppBar />
        <Body>
          <Outlet />
        </Body>
        <Footer />
      </Container>
    </GlobalMinWidth>
  );
};
export default AppLayout;
