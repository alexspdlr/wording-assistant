import styled from '@emotion/styled';
import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

interface IconButtonStyledProps {
  variant: 'permanent' | 'dynamic';
  inactiveBackground: 'transparent' | 'colored' | undefined;
  active: boolean;
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
        ? `${
            props.active
              ? defaultProps.theme.palette.primary.light
              : defaultProps.theme.palette.primary.main
          }`
        : addAlphaToHexColor(defaultProps.theme.palette.text.disabled, 0.65)
    };
    background-color: ${
      props.inactiveBackground === 'colored' || props.active
        ? addAlphaToHexColor(defaultProps.theme.palette.primary.light, 0.07)
        : 'transparent'
    }; 
    cursor: pointer; 
    fill: transparent; 
    transition: background-color 150ms ease-in-out, color 150ms ease-in-out; 
    &:hover{
      color: ${
        props.active
          ? defaultProps.theme.palette.primary.light
          : defaultProps.theme.palette.primary.main
      }; 
      background-color: ${addAlphaToHexColor(
        defaultProps.theme.palette.primary.light,
        props.inactiveBackground === 'colored' ? 0.15 : 0.07
      )}; 
    }
    `
);

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  variant: 'permanent' | 'dynamic';
  inactiveBackground?: 'transparent' | 'colored';
  active?: boolean;
  ref?: React.MutableRefObject<any>;
}

function IconButton(props: IconButtonProps) {
  const { onClick, icon, variant, inactiveBackground, active, ref } = props;
  return (
    <IconButtonStyled
      ref={ref}
      active={active || false}
      onClick={onClick}
      variant={variant}
      inactiveBackground={inactiveBackground}
    >
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
