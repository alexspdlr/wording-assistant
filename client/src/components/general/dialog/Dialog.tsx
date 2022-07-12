import styled from '@emotion/styled';
import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useClickAway from 'src/utils/hooks/useClickAway';
import useMountTransition from 'src/utils/hooks/useMountTransition';
import pageMarginFromBreakpoint from 'src/utils/pageMarginFromBreakpoint';

type Position = 'start' | 'center' | 'end';

const positionHorizontally = (horizontalPosition: Position) => {
  if (horizontalPosition === 'start') return 'left: 0;';
  if (horizontalPosition === 'center') return 'left: 50%;';
  return 'right: 0;';
};

const positionVertically = (verticalPosition: Position) => {
  if (verticalPosition === 'start') return 'top: 0;';
  if (verticalPosition === 'center') return 'top: 50%;';
  return 'bottom: 0;';
};

const transformOrigin = (
  horizontalPosition: Position,
  verticalPosition: Position,
  animationOffset: number,
  margin: number
) => {
  const translateX = () => {
    if (horizontalPosition === 'center') {
      return `calc(-${margin}px + -50%)`;
    }
    return '0px';
  };

  const translateY = () => {
    if (verticalPosition === 'center') {
      return `calc(-${margin}px + -1 * 50% + -1 * ${animationOffset}px )`;
    }
    return `${-animationOffset}px`;
  };
  return `transform: translate(${translateX()},${translateY()});`;
};

interface BoxProps {
  show: boolean;
  transitionDuration: number;
  horizontalPosition: Position;
  verticalPosition: Position;
  showShadow: boolean;
  limitBoxToContainer: boolean;
}

const Box = styled('div')(
  (props: BoxProps) => `
position: absolute; 
  display: inline-block;
  ${positionHorizontally(props.horizontalPosition)} 
  ${positionVertically(props.verticalPosition)}  
${transformOrigin(props.horizontalPosition, props.verticalPosition, 15, 10)}   
  background-color: #fff;
  border-radius: 5px;
  z-index: 999; 
  margin: ${props.limitBoxToContainer ? '10px 0px 10px 0px' : '10px'};  
  opacity: 0; 
    transition: opacity ${props.transitionDuration}ms ease, transform ${
    props.transitionDuration * 2
  }ms ease; 
    ${
      props.show
        ? `opacity: 1; ${transformOrigin(
            props.horizontalPosition,
            props.verticalPosition,
            0,
            10
          )}`
        : undefined
    }   
    ${
      props.showShadow
        ? 'box-shadow: 0px 4px 20px 0px rgba(0,0,0,.1);'
        : undefined
    }

`
);

interface BoxContainerProps {
  horizontalPadding: number;
  limitBoxToContainer: boolean;
}
const BoxContainer = styled('div')(
  (props: BoxContainerProps) => `
  ${props.limitBoxToContainer ? 'position: absolute;' : undefined}  
  z-index: -1;   
  height: 100vh;
    max-width: 1420px;
    width: calc(100% - ${2 * props.horizontalPadding}px);  
    `
);

const BoxWrapper = styled('div')(
  (props) => `
    position: absolute;
    top: 0; 
    z-index: 1000;  
    height: 100vh;
    width: 100vw;
    display: flex; 
    justify-content: center; 
      `
);

interface BackgroundProps {
  show: boolean;
  transitionDuration: number;
  darkenBackground: boolean;
}
const Background = styled('div')(
  (props: BackgroundProps) => `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0, ${props.darkenBackground ? '0.3' : '0.0'});
    z-index: 1000;  
    opacity: 0; 
    transition: opacity ${props.transitionDuration}ms ease;
    ${props.show ? 'opacity: 1;' : undefined} 
  `
);

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: (event: Event) => void;
  transitionDuration: number;
  horizontalPosition?: Position;
  verticalPosition?: Position;
  darkenBackground?: boolean;
}

const Dialog = (props: DialogProps) => {
  const {
    children,
    open,
    onClose,
    transitionDuration,
    horizontalPosition,
    verticalPosition,
    darkenBackground,
  } = props;
  const hasTransitionedIn = useMountTransition(open, transitionDuration);
  const activeBreakpoint = useBreakpoint();

  const boxRef = useRef<HTMLDivElement>(null);
  useClickAway(boxRef, onClose);

  const xxxlActive = compareBreakpoint(activeBreakpoint, '>', '2XL');

  return createPortal(
    /* @ts-ignore:next-line */

    <>
      {(hasTransitionedIn || open) && (
        <>
          <Background
            show={hasTransitionedIn && open}
            transitionDuration={transitionDuration}
            darkenBackground={
              darkenBackground === undefined ? true : darkenBackground
            }
          />
          <BoxWrapper>
            <BoxContainer
              horizontalPadding={pageMarginFromBreakpoint(activeBreakpoint)}
              limitBoxToContainer={xxxlActive}
            >
              <Box
                ref={boxRef}
                show={hasTransitionedIn && open}
                transitionDuration={transitionDuration}
                horizontalPosition={horizontalPosition || 'center'}
                verticalPosition={verticalPosition || 'center'}
                showShadow={
                  darkenBackground === undefined ? false : !darkenBackground
                }
                limitBoxToContainer={xxxlActive}
              >
                {children}
              </Box>
            </BoxContainer>
          </BoxWrapper>
        </>
      )}
    </>,
    /* @ts-ignore:next-line */
    document.getElementById('dialog-portal')
  );
};

export default Dialog;
