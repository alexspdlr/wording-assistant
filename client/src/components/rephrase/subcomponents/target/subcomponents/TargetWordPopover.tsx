import styled from '@emotion/styled';
import { useRef } from 'react';
import useBoundStore from 'src/store';
import useClickAway from 'src/utils/hooks/useClickAway';

/* ---------------------------- Styled components --------------------------- */
interface PopoverPositionProps {
  topInset: number;
  leftInset: number;
}
const PopoverPosition = styled('div')(
  (props: PopoverPositionProps) => (defaultProps) =>
    `  
    position: absolute;
    z-index: 5;
    top: ${props.topInset}px;
    left: ${props.leftInset}px; 
  `
);

interface PopoverContainerProps {
  fontSize: string;
}
const PopoverContainer = styled('div')(
  (props: PopoverContainerProps) => (defaultProps) =>
    `  
  -webkit-transition: all 0.1s ease;
  -moz-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;  
  font-size: ${props.fontSize}; 
  font-weight: 400;   
  box-shadow: 0px 2px 10px rgb(0 0 0 / 15%);  
  max-height: 390px;
  max-width: 318px;
  min-width: 100px;
  margin-top: 4px; 
  width: auto;
  height: auto;
  background-color: ${defaultProps.theme.palette.background.main};
  overflow-y: scroll;
  scrollbar-width: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; 
  }
  `
);

interface AlternativeProp {
  disabled?: boolean;
}
const Alternative = styled('div')(
  (props: AlternativeProp) => (defaultProps) =>
    ` 
  -webkit-transition: all 0.1s ease; 
  -moz-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;  
  padding: 4px 9px; 
  font-weight: 300; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
  cursor: default; 
  ${
    !props.disabled &&
    `cursor: pointer;
    &:hover { background-color: ${
      defaultProps.theme.activeMode === 'light'
        ? '#ffe4b3'
        : defaultProps.theme.palette.primary.light
    }; };`
  }
  `
);

/* -------------------------------------------------------------------------- */
/*                              TargetWordPopover                             */
/* -------------------------------------------------------------------------- */

interface TargetWordPopoverProps {
  popoverTargetRect: DOMRect | null;
  setShowTargetWordPopover: (bool: boolean) => void;
}

const TargetWordPopover = (props: TargetWordPopoverProps) => {
  const { popoverTargetRect, setShowTargetWordPopover } = props;

  // FROM STORE
  const alternatives = useBoundStore(
    (state) => state.uiState.rephrasingOptions
  );
  const selectWordingAlternative = useBoundStore(
    (state) => state.selectWordingAlternative
  );

  // UTILS
  const fontSize =
    document.getElementById('target-value-input')?.style.fontSize || '22px';

  const onClickAway = (event: any) => {
    if (!(event.target.id === 'target-value-input')) {
      setShowTargetWordPopover(false);
    }
  };

  // OTHER HOOKS
  const containerRef = useRef(null);
  useClickAway(containerRef, onClickAway);

  // RENDER
  return (
    <>
      {popoverTargetRect && (
        <PopoverPosition
          topInset={
            window.pageYOffset + popoverTargetRect.y + popoverTargetRect.height
          }
          leftInset={popoverTargetRect.x}
        >
          <PopoverContainer
            ref={containerRef}
            fontSize={fontSize === '25.99px' ? '22px' : fontSize}
          >
            {alternatives.length > 0 ? (
              <>
                {alternatives.map((value, i) => (
                  <Alternative
                    onClick={() => selectWordingAlternative(i, value)}
                  >
                    {value}
                  </Alternative>
                ))}
              </>
            ) : (
              <Alternative disabled>...</Alternative>
            )}
          </PopoverContainer>
        </PopoverPosition>
      )}
    </>
  );
};

export default TargetWordPopover;
