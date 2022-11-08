import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useState } from 'react';
import useHover from 'src/utils/hooks/useHover';

interface TooltipProps {
  children: ReactNode;
  content: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  permanent?: boolean;
  hidden?: boolean;
}

const Wrapper = styled('div')(
  () => `
  display: inline-block;
  position: relative; 
  z-index: 999; 
  `
);

interface TipProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  margin: number;
  arrowSize: number;
  isRevealed: boolean;
}

const direction = (props: TipProps, theme: Theme) => {
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

const Tip = styled('div')(
  (props: TipProps) => (defaultProps) =>
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

${direction(props, defaultProps.theme)}

    `
);

const Tooltip = (props: TooltipProps) => {
  const { children, content, direction, delay, permanent, hidden } = props;
  const [tooltipActive, setTooltipActive] = useState(false);
  const [hoverRef, isHovered] = useHover();

  let timeout: string | number | NodeJS.Timeout | undefined;

  const reveal = () => {
    timeout = setTimeout(() => {
      setTooltipActive(true);
    }, delay || 600);
  };

  const hide = () => {
    clearInterval(timeout);
    setTooltipActive(false);
  };

  useEffect(() => {
    if (isHovered) {
      reveal();
    } else {
      hide();
    }
  }, [isHovered]);

  return (
    <Wrapper ref={hoverRef}>
      <Tip
        direction={direction || 'top'}
        margin={7}
        arrowSize={6}
        isRevealed={
          (!hidden && isHovered && tooltipActive) || permanent === true
        }
      >
        {content}
      </Tip>

      {children}
    </Wrapper>
  );
};

export default Tooltip;
