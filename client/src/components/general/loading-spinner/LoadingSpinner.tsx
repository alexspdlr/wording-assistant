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
  width: 22px;
  height: 22px;
  margin: 3px;
  border: 3px solid ${defaultProps.theme.palette.primary.light};
  border-radius: 50%;
  animation: spin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${
    defaultProps.theme.palette.primary.light
  } transparent transparent transparent;
  animation-delay: -${0.1 * props.index + 1}s;  
    `
);

const LoadingSpinner = () => {
  return (
    <Container>
      <Spinner index={0} />
      <Spinner index={1} />
      <Spinner index={2} />
      <Spinner index={3} />
    </Container>
  );
};

export default LoadingSpinner;
