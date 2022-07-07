import styled from '@emotion/styled';
import {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react';

interface InputControlButtonStyled {
  variant: 'permanent' | 'dynamic';
}

const InputControlButtonStyled = styled('button')(
  (props: InputControlButtonStyled) => `
    
    border: 0; 
    width: 40px; 
    height: 40px; 
    border-radius: 4px; 
    padding: 8px; 
    color: ${props.variant === 'permanent' ? '#0f2b46' : 'rgb(155, 163, 172)'};
    background-color: transparent; 
    cursor: pointer; 
    fill: transparent; 
    &:hover{
      color: #0f2b46; 
      background-color: #f2f4f7; 
    }
    `
);

interface InputControlButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  variant: 'permanent' | 'dynamic';
}

function InputControlButton(props: InputControlButtonProps) {
  const { onClick, icon, variant } = props;
  return (
    <InputControlButtonStyled onClick={onClick} variant={variant}>
      {cloneElement(icon, {
        style: {
          width: 24,
          fill: 'inherit',
        },
      })}
    </InputControlButtonStyled>
  );
}

export default InputControlButton;
