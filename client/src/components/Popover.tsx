import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Popover, Fade, Divider, Collapse } from '@mui/material';
import Loader from './Loader';
import AnimateHeight from './AnimateHeight';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PopoverContainer = styled('div')(
  (props) => `  
  -webkit-transition: all 0.25s ease-out;
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out; 
    font-size: 22px; 
  font-weight: 400;   
    `
);

const StyledCSSTransition = styled(CSSTransition)(
  () => `
  -webkit-transition: all 0.5s ;
  -moz-transition: all 0.5s ;
  -o-transition: all 0.5s ;
  transition: all 0.5s ; 
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
  ${!props.disabled && `cursor: pointer;`} 
  ${
    !props.disabled &&
    `&:hover {
    background-color: rgba(0, 99, 149, 0.2); 
  }`
  } 
    `
);

interface CustomPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | undefined;
  alternatives: string[];
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

const CustomPopover = ({
  open,
  anchorEl,
  alternatives,
  onClose,
}: CustomPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      transitionDuration={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        mt: 0.4,
        p: '0px !important',
        boxShadow: `0 1px 4px 0 rgb(0 0 0 / 10%);`,
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '*::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          boxShadow: '0 1px 4px 0 rgb(0 0 0 / 10%)',
          border: '1px solid #dae1e8',
          maxHeight: '250px',
          width: 'auto',
          height: 'auto',
        },
      }}
    >
      <PopoverContainer>
        <AnimateHeight>
          {' '}
          <div style={{ position: 'relative' }}>
            {alternatives.length > 0 ? (
              <>
                {alternatives.map((alternative, i) => (
                  <Alternative>{alternative}</Alternative>
                ))}
              </>
            ) : (
              <Alternative disabled>...</Alternative>
            )}
          </div>
        </AnimateHeight>
      </PopoverContainer>
    </Popover>
  );
};

export default CustomPopover;
