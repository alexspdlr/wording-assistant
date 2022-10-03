import styled from '@emotion/styled';
import { ReactNode } from 'react';
import AnimateHeight from './AnimateHeight';

const PopoverContainer = styled('div')(
  (props) => `  
  -webkit-transition: all 0.25s ease-out;
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out; 
  position: absolute; 
  z-index: 10; 
  font-size: 22px; 
  font-weight: 400;   
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%); 
  max-height: 250px;
  max-width: 318px;
  min-width: 100px;
  width: auto;
  height: auto;
  background-color: ${props.theme.palette.background.main};
  `
);

interface AlternativeProp {
  disabled?: boolean;
}
const Alternative = styled('div')(
  (props: AlternativeProp) => ` 
  -webkit-transition: all 0.25s ease-out; 
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;  
  padding: 6px 11px 6px 11px; 
  font-weight: 300; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); 
  ${
    !props.disabled &&
    `cursor: pointer;
    &:hover { background-color: rgba(254, 232, 193, 1); };`
  }
  `
);

interface CustomPopoverProps {
  alternatives: string[];
  rephrase: (alternative: string) => void;
  children: ReactNode;
}

const CustomPopover = ({ alternatives, rephrase }: CustomPopoverProps) => {
  return (
    <PopoverContainer>
      <AnimateHeight>
        {' '}
        <div style={{ position: 'relative' }}>
          {alternatives.length > 0 ? (
            <>
              {alternatives.map((alternative, i) => (
                <Alternative onClick={() => rephrase(alternative)}>
                  {alternative}
                </Alternative>
              ))}
            </>
          ) : (
            <Alternative disabled>...</Alternative>
          )}
        </div>
      </AnimateHeight>
    </PopoverContainer>
  );
};

export default CustomPopover;
