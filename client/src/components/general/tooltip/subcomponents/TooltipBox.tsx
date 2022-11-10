import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

/* ---------------------------------- Utils --------------------------------- */

const determineDirectionalStyle = (props: TooltipBoxProps, theme: Theme) => {
  const { direction, margin, arrowSize } = props;
  switch (direction) {
    case 'left':
      return `
        left: auto;
        right: calc(100% + ${margin}px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
  
        &:before {
          left: auto;
          right: calc(${arrowSize}px * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: ${theme.palette.text.light}; 
        }
              `;
    case 'right':
      return `
        left: calc(100% + ${margin}px);
        top: 50%;
        transform: translateX(0) translateY(-50%);
  
        &:before {
          left: calc(${arrowSize}px * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: ${theme.palette.text.light};
        }
              `;
    case 'bottom':
      return `
        top: calc(100% + ${margin}px);
  
        &:before {
          bottom: 100%;
          border-bottom-color: ${theme.palette.text.light};
        }
              `;

    default:
      return `
        bottom: calc(100% + ${margin}px);
  
        &:before {
          top: 100%;
          border-top-color: ${theme.palette.text.light};
        }
              `;
  }
};

/* -------------------------------------------------------------------------- */
/*                                 TooltipBox                                 */
/* -------------------------------------------------------------------------- */

interface TooltipBoxProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  margin: number;
  arrowSize: number;
  isRevealed: boolean;
}

const TooltipBox = styled('div')(
  (props: TooltipBoxProps) => (defaultProps) =>
    `
    position: absolute;
    border-radius: 3px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 13px 10px 13px;
    color: ${defaultProps.theme.palette.background.dark};
    background: ${defaultProps.theme.palette.text.light};
    font-size: 13px;
    font-family: sans-serif;
    line-height: 1;
    z-index: ${props.isRevealed ? '100' : '-1'};
    white-space: nowrap;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
      Arial, sans-serif !important;
      font-weight: 400; 
      opacity: ${props.isRevealed ? '1' : '0'};
      transition: opacity 350ms ease-in-out, z-index 400ms ease-in-out; 
   
    &:before {
      content: " ";
      left: 50%;
      border: solid transparent;
      height: 0;
      width: 0; 
      position: absolute;
      pointer-events: none;
      border-width: ${props.arrowSize}px;
      margin-left: calc(${props.arrowSize}px * -1);
    }
  
  ${determineDirectionalStyle(props, defaultProps.theme)}
  
      `
);

export default TooltipBox;
