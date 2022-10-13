import styled from '@emotion/styled';

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled('div')(
  (props: ContainerProps) => `
  display: flex;
  position: relative;
  width: ${props.width}px;
  height: ${props.height}px; 
  justify-content: center; 
  align-items: center; 
  `
);

interface BorderProps {
  index: number;
  width: number;
  height: number;
}

const Border = styled('div')(
  (props: BorderProps) => (defaultProps) =>
    `

    @keyframes lds-ripple {
        0% {
          
          width: ${props.width}px;
          height: ${props.height}px; 
          opacity: 0; 
        }


        15% {
       

            opacity: 0.2;  
        }

        30% {
       

            opacity: 0.15;  
        }

        45% {
       

            opacity: 0.05;  
        }

        60% {

            opacity: 0.015;  
        }

        70% {

            opacity: 0;  
        }

        100% {

            width: ${props.width * 0.4}px;
            height: ${props.height * 0.4}px;  
            opacity: 0; 
        }
      } 

  position: absolute;
  border: 1px solid ${defaultProps.theme.palette.primary.light}; 
  opacity: 1;
  animation: lds-ripple 1.75s ease-in infinite; 
    `
);

const LoadingRipple = () => {
  const width = 600;
  const height = 600;

  return (
    <Container width={width} height={height}>
      <Border index={0} width={width} height={height} />
    </Container>
  );
};

export default LoadingRipple;
