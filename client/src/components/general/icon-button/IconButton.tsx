import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

interface IconButtonStyledProps {
  variant: 'permanent' | 'dynamic';
}

const IconButtonStyled = styled('button')(
  (props: IconButtonStyledProps) => (defaultProps) =>
    `
    border: 0; 
    width: 40px; 
    height: 40px; 
    border-radius: 4px; 
    padding: 8px; 
    color: ${
      props.variant === 'permanent'
        ? defaultProps.theme.palette.primary.main
        : defaultProps.theme.palette.text.disabled
    };
    background-color: transparent; 
    cursor: pointer; 
    fill: transparent; 
    &:hover{
      color: ${defaultProps.theme.palette.primary.main}; 
      background-color: ${addAlphaToHexColor(
        defaultProps.theme.palette.text.main,
        0.07
      )}; 
    }
    `
);

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  variant: 'permanent' | 'dynamic';
}

function IconButton(props: IconButtonProps) {
  const { onClick, icon, variant } = props;
  return (
    <IconButtonStyled onClick={onClick} variant={variant}>
      {cloneElement(icon, {
        style: {
          width: 24,
          fill: 'inherit',
        },
      })}
    </IconButtonStyled>
  );
}

export default IconButton;
