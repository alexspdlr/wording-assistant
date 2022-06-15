import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Popover, Fade } from '@mui/material';

const PopoverContainer = styled('div')(
  (props) => ` 
    padding: 10px; 
    font-size: 18px; 
    font-weight: 400;  
    color: #333
    `
);

const mockList = [
  'Alternative A ...',
  'Alternative B ...',
  'Alternative C ...',
  'Alternative D ...',
  'Alternative E ...',
];

interface CustomPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | undefined;
  children: ReactNode;
}

const CustomPopover = ({ open, anchorEl, children }: CustomPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      TransitionComponent={Fade}
      transitionDuration={{ enter: 300, exit: 250 }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        mt: 0.5,
        p: 2,
        boxShadow: `0 1px 4px 0 rgb(0 0 0 / 10%);`,
      }}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          boxShadow:
            'rgba(0, 0, 0, 0.13) 0px 1px 4px, rgba(0, 0, 0, 0.23) 0px 1px 4px ',
        },
      }}
    >
      <PopoverContainer>{children}</PopoverContainer>
    </Popover>
  );
};

export default CustomPopover;
