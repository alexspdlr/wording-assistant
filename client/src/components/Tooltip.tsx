import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
}

const Wrapper = styled('div')(
  () => `
  display: inline-block;
  position: relative; 
  `
);

interface TipProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  margin: number;
  arrowSize: number;
  isRevealed: boolean;
}

const directionalClass = (props: TipProps) => {
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
        border-left-color: #1c1e25; 
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
        border-right-color: #1c1e25;
      }
            `;
    case 'bottom':
      return `
      top: calc(100% + ${margin}px);

      &:before {
        bottom: 100%;
        border-bottom-color: #1c1e25;
      }
            `;

    default:
      return `
      bottom: calc(100% + ${margin}px);

      &:before {
        top: 100%;
        border-top-color: #1c1e25;
      }
            `;
  }
};

const Tip = styled('div')(
  (props: TipProps) => `
  position: absolute;
  border-radius: 3px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 13px 10px 13px;
  color: #fff;
  background: #1c1e25;
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

${directionalClass(props)}

    `
);

const Tooltip = (props: TooltipProps) => {
  const { children, content, direction, delay } = props;
  const [tooltipActive, setTooltipActive] = useState(false);

  let timeout: string | number | NodeJS.Timeout | undefined;
  const reveal = () => {
    timeout = setTimeout(() => {
      setTooltipActive(true);
    }, delay || 500);
  };

  const hide = () => {
    clearInterval(timeout);
    setTooltipActive(false);
  };

  return (
    <Wrapper onMouseEnter={reveal} onMouseLeave={hide}>
      <Tip
        direction={direction || 'top'}
        margin={7}
        arrowSize={6}
        isRevealed={tooltipActive}
      >
        {content}
      </Tip>

      {children}
    </Wrapper>
  );
};

export default Tooltip;
