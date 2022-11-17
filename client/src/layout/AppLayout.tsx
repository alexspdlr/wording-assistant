import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import AppBar from 'src/components/appbar';
import Footer from 'src/components/footer';

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

const GlobalMinWidth = styled('div')(
  (props) => `
  min-width: 650px; 
  overflow-x: scroll;
`
);

const AppLayout = () => {
  return (
    <GlobalMinWidth>
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
