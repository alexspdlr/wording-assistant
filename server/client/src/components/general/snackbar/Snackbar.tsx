import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface ContainerProps {
  color: string;
  contrastColor: string;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    `

padding: 12px; 
font-size: 12px; 
display: flex; 
align-itmes: center; 
justify-content: center;  
color: ${props.contrastColor};
background-color: ${props.color};
  `
);

type SnackbarVariant = 'error' | 'warning' | 'info' | 'success';

interface SnackbarProps {
  variant: SnackbarVariant;
  message: string;
}

const colorByVariant = (variant: SnackbarVariant, theme: Theme) => {
  if (variant === 'error') {
    return theme.palette.error.main;
  }

  if (variant === 'warning') {
    return theme.palette.warning.main;
  }

  if (variant === 'info') {
    return theme.palette.info.main;
  }

  return theme.palette.success.main;
};

const contrastColorByVariant = (variant: SnackbarVariant, theme: Theme) => {
  if (variant === 'error') {
    return theme.palette.error.contrastText;
  }

  if (variant === 'warning') {
    return theme.palette.warning.contrastText;
  }

  if (variant === 'info') {
    return theme.palette.info.contrastText;
  }

  return theme.palette.success.contrastText;
};

const Snackbar = (props: SnackbarProps) => {
  const { variant, message } = props;

  const theme = useTheme();

  return (
    <Container
      color={colorByVariant(variant, theme)}
      contrastColor={contrastColorByVariant(variant, theme)}
    >
      {message}
    </Container>
  );
};

export default Snackbar;
