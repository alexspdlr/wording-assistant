/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import NotSupportedDialog from './components/not-supported-dialog';
import theme from './constants';
import Routes from './Routes';
import useBoundStore from './store';
import compareBreakpoint from './utils/compareBreakpoint';
import useBreakpoint from './utils/hooks/useBreakpoint';

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
  const activeBreakpoint = useBreakpoint();

  const [touchNotSupportedDialogOpen, setTouchNotSupportedDialogOpen] =
    useState('ontouchstart' in document.documentElement);

  const [browserNotSupportedDialogOpen, setBrowserNotSupportedDialogOpen] =
    useState(
      !(
        navigator.userAgent.indexOf('Safari') > -1 ||
        navigator.userAgent.indexOf('Chrome') > -1 ||
        window.navigator.userAgent.indexOf('Edg') > -1
      )
    );

  const [
    screensizeNotSupportedDialogOpen,
    setScreensizeNotSupportedDialogOpen,
  ] = useState(compareBreakpoint(activeBreakpoint, '<', 'XS'));

  useEffect(() => {
    if (compareBreakpoint(activeBreakpoint, '<', 'XS')) {
      if (!screensizeNotSupportedDialogOpen) {
        setScreensizeNotSupportedDialogOpen(true);
      }
    } else {
      if (screensizeNotSupportedDialogOpen) {
        setScreensizeNotSupportedDialogOpen(false);
      }
    }
  }, [activeBreakpoint]);

  return (
    <>
      <ThemeProvider theme={isDarkMode === 'dark' ? theme.dark : theme.light}>
        <GlobalStyles>
          <GlobalBackground />
          <Routes />

          <NotSupportedDialog
            open={browserNotSupportedDialogOpen}
            setOpen={setBrowserNotSupportedDialogOpen}
            heading='Browser not supported'
            body={`Unfortunately, your browser is not yet supported. Please use one of the following browsers: Google Chrome, Microsoft Egde, (Apple) Safari.`}
          />
          <NotSupportedDialog
            open={touchNotSupportedDialogOpen}
            setOpen={setTouchNotSupportedDialogOpen}
            heading='Touch devices not supported'
            body='Unfortunately, touch input is not yet supported. Please use a desktop device.'
          />
          <NotSupportedDialog
            open={screensizeNotSupportedDialogOpen}
            setOpen={setScreensizeNotSupportedDialogOpen}
            heading='Screen size not supported'
            body='Unfortunately, the current screen size is not yet supported. Please use a larger device.'
          />
        </GlobalStyles>
      </ThemeProvider>
    </>
  );
};

export default App;
