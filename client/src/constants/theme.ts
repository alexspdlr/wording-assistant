import { Theme } from '@emotion/react';

interface ThemeMode {
  light: Theme;
  dark: Theme;
}

/*
primary: {
      main: '#307FE2',
      light: '#62a2f0',
      dark: '#2773D2',
      contrastText: '#ffffff',
    },
*/
const darkTheme: Theme = {
  activeMode: 'dark',
  palette: {
    primary: {
      main: '#fff',
      light: '#3776B6',
      dark: '#20476e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#037171',
      light: '#05adad',
      dark: '#035757',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#f46f52',
      light: '#ff866b',
      dark: '#bf4a30',
      contrastText: '#ffffff',
    },
    error: {
      main: '#a03e3d',
      light: '#cf504e',
      dark: '#803330',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#bd8f2d',
      light: '#dea835',
      dark: '#8a6921',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3d86ba',
      light: '#4fadf0',
      dark: '#244f6e',
      contrastText: '#ffffff',
    },
    success: {
      main: '#3da060',
      light: '#4dc978',
      dark: '#2a6e41',
      contrastText: '#ffffff',
    },
    divider: '#2c3033',
    border: '#2c3033',
    background: {
      main: '#1c1e21',
      light: '#222426',
      dark: '#151718',
    },
    text: {
      main: '#e6e6e6',
      light: '#e6e6e6',
      dark: '#9ba1a6',
      disabled: '#9ba1a6',
    },
  },
};

const lightTheme: Theme = {
  activeMode: 'light',
  palette: {
    primary: {
      main: '#0F2B46',
      light: '#006395',
      dark: '#0F2B46',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#037171',
      light: '#05adad',
      dark: '#035757',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#f46f52',
      light: '#ff866b',
      dark: '#bf4a30',
      contrastText: '#ffffff',
    },
    error: {
      main: '#a03e3d',
      light: '#cf504e',
      dark: '#803330',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#bd8f2d',
      light: '#dea835',
      dark: '#8a6921',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3d86ba',
      light: '#4fadf0',
      dark: '#244f6e',
      contrastText: '#ffffff',
    },
    success: {
      main: '#3da060',
      light: '#4dc978',
      dark: '#2a6e41',
      contrastText: '#ffffff',
    },
    divider: '#F1F1F1',
    border: '#dae1e8',
    background: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#f7f7f7',
    },
    text: {
      main: '#1b1e25',
      light: '#333333',
      dark: '#000000',
      disabled: '#6e6e6e',
    },
  },
};

const theme: ThemeMode = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
