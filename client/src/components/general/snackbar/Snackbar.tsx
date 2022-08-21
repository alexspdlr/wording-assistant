import styled from '@emotion/styled';

interface ContainerProps {
  color: string;
}

const Container = styled('div')(
  (props: ContainerProps) => `

padding: 12px; 
font-size: 12px; 
display: flex; 
align-itmes: center; 
justify-content: center; 
color: #ffffff;
background-color: ${props.color};
  `
);

type SnackbarVariant = 'error' | 'warning' | 'info' | 'success';

interface SnackbarProps {
  variant: SnackbarVariant;
  message: string;
}

const colorByVariant = (variant: SnackbarVariant) => {
  if (variant === 'error') {
    return '#a03e3d';
  }

  if (variant === 'warning') {
    return '#bd8f2d';
  }

  if (variant === 'info') {
    return '#3d86ba';
  }

  return '#3da060';
};

const Snackbar = (props: SnackbarProps) => {
  const { variant, message } = props;
  return <Container color={colorByVariant(variant)}>{message}</Container>;
};

export default Snackbar;
