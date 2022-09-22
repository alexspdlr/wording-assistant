import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';
import theme from './constants/theme';
import Routes from './Routes';
import useBoundStore from './store';

const GlobalStyles = styled('div')(
  (props) => `
  color: ${props.theme.palette.text.main};
`
);

const App = () => {
  const isDarkMode = useBoundStore((state) => state.colorMode);

  return (
    <>
      <ThemeProvider theme={isDarkMode === 'dark' ? theme.dark : theme.light}>
        <GlobalStyles>
          <Routes />
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
};

export default App;
