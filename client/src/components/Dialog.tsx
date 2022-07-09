import styled from '@emotion/styled';
import { duration } from '@mui/material';
import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useClickAway from '../utils/hooks/useClickAway';
import useMountTransition from '../utils/hooks/useMountTransition';

interface BoxProps {
  in: boolean;
  visible: boolean;
  transitionDuration: number;
}
const Box = styled('div')(
  (props: BoxProps) => `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px; 
  z-index: 999; 
  opacity: 0; 
    transition: opacity ${props.transitionDuration}ms ease-in-out;
    ${props.in && props.visible && 'opacity: 1;'} 
`
);

interface BackgroundProps {
  in: boolean;
  visible: boolean;
  transitionDuration: number;
}
const Background = styled('div')(
  (props: BackgroundProps) => `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0, 0.3);
    z-index: 999; 
    opacity: 0; 
    transition: opacity ${props.transitionDuration}ms ease-in-out;
    ${props.in && props.visible && 'opacity: 1;'} 
  `
);

interface TransitionProps {
  in: boolean;
  visible: boolean;
}

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: (event: Event) => void;
  transitionDuration: number;
}

const Dialog = (props: DialogProps) => {
  const { children, open, onClose, transitionDuration } = props;
  const hasTransitionedIn = useMountTransition(open, transitionDuration);

  const boxRef = useRef<HTMLDivElement>(null);
  useClickAway(boxRef, onClose);

  return createPortal(
    /* @ts-ignore:next-line */

    <>
      {(hasTransitionedIn || open) && (
        <>
          <Background
            in={hasTransitionedIn}
            visible={open}
            transitionDuration={transitionDuration}
          />
          <Box
            ref={boxRef}
            in={hasTransitionedIn}
            visible={open}
            transitionDuration={transitionDuration}
          >
            {children}
          </Box>
        </>
      )}
    </>,
    /* @ts-ignore:next-line */
    document.getElementById('dialog-portal')
  );
};

export default Dialog;
