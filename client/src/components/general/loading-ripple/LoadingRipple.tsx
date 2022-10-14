import styled from '@emotion/styled';

interface ContainerProps {
  width: number;
  height: number;
  padding: number;
  hide: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => `
  display: flex;
  position: absolute;
  width: ${props.width}px;
  height: ${props.height}px; 
  padding: ${props.padding}px; 
  justify-content: center; 
  align-items: center; 
  z-index: ${props.hide ? '0' : '55'};
  opacity:${props.hide ? '0' : '1'}; 
  transition: opacity 500ms ease; 
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
       

            opacity: 0.15;  
        }

        30% {
       

            opacity: 0.1;  
        }

        45% {
       

            opacity: 0.05;  
        }

        60% {

            opacity: 0.02;  
        }

        70% {

            opacity: 0.01;  
        }

        85% {

          opacity: 0.;  
      }

        100% {

            width: ${props.width * 0.75}px; 
            height: ${props.height * 0.75}px;  
            opacity: 0; 
        }
      } 
 
  position: absolute;
  border: 1px solid ${defaultProps.theme.palette.primary.main}; 
  opacity: 1;  
  animation: lds-ripple 1.75s ease-in infinite; 
  transition-delay: 1s;
    `
);

interface LoadingRippleProps {
  hide: boolean;
  width: number | null;
  height: number | null;
}

const LoadingRipple = (props: LoadingRippleProps) => {
  const { width, height, hide } = props;
  const padding = 4;

  if (width === null || height === null) {
    return null;
  }

  return (
    <Container
      hide={hide}
      width={width - 2 * padding}
      height={height - 2 * padding}
      padding={padding}
    >
      <Border
        index={0}
        width={width - 2 * padding}
        height={height - 2 * padding}
      />
    </Container>
  );
};

export default LoadingRipple;
