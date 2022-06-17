import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Popover, Fade } from '@mui/material';
import Loader from './Loader';

const PopoverContainer = styled('div')(
  (props) => ` 
  -webkit-transition: all 0.25s ease-out;
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out; 
  font-size: 22px; 
  font-weight: 400;  
  color: #333;
  height: auto; 
    `
);

const Alternative = styled('div')(
  (props) => ` 
  padding: 6px 11px 6px 11px; 
  font-weight: 300; 
  cursor: pointer; 
  -webkit-transition: all 0.25s ease-out;
  -moz-transition: all 0.25s ease-out;
  -o-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: rgba(0, 99, 149, 0.2); 
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
      transitionDuration={{ enter: 400, exit: 250 }}
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
        },
      }}
    >
      <PopoverContainer>
        {alternatives.length > 0 ? (
          <div>
            {alternatives.map((alternative) => (
              <Alternative>{alternative}</Alternative>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </PopoverContainer>
    </Popover>
  );
};

export default CustomPopover;
