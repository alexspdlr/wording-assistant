import { ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import themeConstant from './constants/theme';
import Routes from './Routes';
import useBoundStore from './store';

const GlobalStyles = styled('div')(
  (props) => `
  color: ${props.theme.palette.text.main}; 
`
);

const GlobalBackground = styled('div')(
  (props) => `
  position: fixed; 
  top: 0;
  right: 0; 
  left: 0; 
  bottom: 0;
  z-index: -1; 
  background-color: ${props.theme.palette.background.dark};  
  overflow: hidden;
`
);

const App = () => {
  const isDarkMode = useBoundStore((state) => state.colorMode);

  return (
    <>
      <ThemeProvider
        theme={isDarkMode === 'dark' ? themeConstant.dark : themeConstant.light}
      >
        <GlobalStyles>
          <GlobalBackground />
          <Routes />
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
};

export default App;
