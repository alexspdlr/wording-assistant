import styled from '@emotion/styled';
import { useState } from 'react';
import useBoundStore from 'src/store';

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
  margin-top: 5px; 
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
  (props: AlternativeProp) => ` 
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
    &:hover { background-color: rgba(254, 232, 193, 1); };`
  }
  `
);

interface TargetWordPopoverProps {
  popoverTargetRect: DOMRect | null;
}

const TargetWordPopover = (props: TargetWordPopoverProps) => {
  const { popoverTargetRect } = props;
  const alternatives = useBoundStore(
    (state) => state.uiState.rephrasingOptions
  );

  const selectWordingAlternative = useBoundStore(
    (state) => state.selectWordingAlternative
  );

  const fontSize =
    document.getElementById('target-value-input')?.style.fontSize || '22px';

  return (
    <>
      {popoverTargetRect && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: popoverTargetRect.y + popoverTargetRect.height,
            left: popoverTargetRect.x,
          }}
        >
          <PopoverContainer
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
        </div>
      )}
    </>
  );
};

export default TargetWordPopover;
