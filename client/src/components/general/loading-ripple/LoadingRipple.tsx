import styled from '@emotion/styled';

interface ContainerProps {
  padding: number;
  hide: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => `
  display: flex;
  position: absolute;

  width: 100%;
  height: 100%;  
  justify-content: center; 
  align-items: center; 
  z-index: ${props.hide ? '0' : '55'};
  opacity:${props.hide ? '0' : '1'}; 
  transition: opacity 500ms ease;  
  `
);

interface BorderProps {
  index: number;
}

const Border = styled('div')(
  (props: BorderProps) => (defaultProps) =>
    `

    @keyframes lds-ripple {
        0% {
          
          width: 100%;
          height: 100%; 
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

            width: 75%; 
            height: 75%;  
            opacity: 0; 
        }
      } 
 
  border: 1px solid ${defaultProps.theme.palette.primary.main}; 
  border-bottom-right-radius: 6px; 
  opacity: 1;  
  position: absolute; 
  animation: lds-ripple 1.75s ease-in infinite; 
  transition-delay: 1s;
    `
);

interface LoadingRippleProps {
  hide: boolean;
}

const LoadingRipple = (props: LoadingRippleProps) => {
  const { hide } = props;
  const padding = 4;

  return (
    <Container hide={hide} padding={padding}>
      <Border index={0} />
    </Container>
  );
};

export default LoadingRipple;
