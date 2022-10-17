import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled('div')(
  (props) => `
  display: inline-block;
  position: relative;
  width: 22px;
  height: 22px;
  animation: fadeIn 200ms;

  @keyframes fadeIn {
    0% { opacity: 0; }
    5% { opacity: 0.1; }
    100% { opacity: 1; }
  }

  `
);

interface SpinnerProps {
  index: number;
  size: number;
  color: string;
}

const Spinner = styled('div')(
  (props: SpinnerProps) => (defaultProps) =>
    `

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% { 
      transform: rotate(360deg);
    }
  }

    box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props.size}px;
  height: ${props.size}px;
  margin: 3px;
  border: ${props.size / 6}px solid ${defaultProps.theme.palette.primary.light};
  border-radius: 50%;
  animation: spin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props.color} transparent transparent transparent;
  animation-delay: -${0.1 * props.index + 1}s;  
    `
);

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size, color } = props;
  const theme = useTheme();
  return (
    <Container>
      <Spinner
        index={0}
        size={size || 22}
        color={color || theme.palette.primary.light}
      />
      <Spinner
        index={1}
        size={size || 22}
        color={color || theme.palette.primary.light}
      />
      <Spinner
        index={2}
        size={size || 22}
        color={color || theme.palette.primary.light}
      />
      <Spinner
        index={3}
        size={size || 22}
        color={color || theme.palette.primary.light}
      />
    </Container>
  );
};

export default LoadingSpinner;
