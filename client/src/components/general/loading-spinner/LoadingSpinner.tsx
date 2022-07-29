import styled from '@emotion/styled';

const Container = styled('div')(
  (props) => `
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  `
);

interface SpinnerProps {
  index: number;
}

const Spinner = styled('div')(
  (props: SpinnerProps) => `

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
  width: 32px;
  height: 32px;
  margin: 5px;
  border: 5px solid #0F2B46;
  border-radius: 50%;
  animation: spin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #0F2B46 transparent transparent transparent;
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
