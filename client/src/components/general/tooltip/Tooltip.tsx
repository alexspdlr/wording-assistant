/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';
import useHover from 'src/utils/hooks/useHover';
import TooltipBox from './subcomponents/TooltipBox';

/* ---------------------------- Styled components --------------------------- */

const Wrapper = styled('div')(
  () => `
  display: inline-block;
  position: relative; 
  z-index: 999; 
  `
);

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */

interface TooltipProps {
  children: ReactNode;
  content: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  permanent?: boolean;
  hidden?: boolean;
}

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
      <TooltipBox
        direction={direction || 'top'}
        margin={7}
        arrowSize={6}
        isRevealed={
          (!hidden && isHovered && tooltipActive) || permanent === true
        }
      >
        {content}
      </TooltipBox>

      {children}
    </Wrapper>
  );
};

export default Tooltip;
