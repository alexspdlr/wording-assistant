import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    activeMode: 'dark' | 'light';
    palette: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      tertiary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      info: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      divider: string;
      background: {
        main: string;
        light: string;
        dark: string;
      };
      text: {
        main: string;
        light: string;
        dark: string;
        disabled: string;
      };
    };
  }
}
