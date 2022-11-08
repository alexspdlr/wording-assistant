import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import copyToClipboard from 'src/utils/copyToClipboard';

interface PopoverContainerProps {
  hide: boolean;
}

const PopoverContainer = styled('div')(
  (props: PopoverContainerProps) => (defaultProps) =>
    `  
    position: absolute;
    z-index: ${props.hide ? '-100' : '99'}; 
    display: ${props.hide ? 'none' : 'block'}; 
    bottom: 100%; 
    margin-bottom: 4px; 
    border: 1px solid ${defaultProps.theme.palette.border};
    background-color: ${defaultProps.theme.palette.background.light};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); 
    padding: 16px;
    border-radius: 6px; 
    right: 0px; 
    font-size: 14px; 
    font-weight: 600; 
    width: 240px; 

    animation: grow 300ms;

    @keyframes grow {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }

    }

  `
);

interface CopyButtonProps {}

const CopyButton = styled('div')(
  (props: CopyButtonProps) => (defaultProps) =>
    `  
   background-color: ${defaultProps.theme.palette.primary.dark};
   color: ${defaultProps.theme.palette.primary.contrastText};
   font-weight: 400;
   line-height: 19.5px;
   padding: 6.5px 13px;
   border-radius: 3px; 
   width: 100%;
   display: flex;
   justify-content: center; 
   cursor: pointer; 
   transition: background-color 150ms ease-in-out; 
   &:hover {
    background-color: ${defaultProps.theme.palette.primary.light};
  } 
  `
);

interface URLInputProps {}

const URLInput = styled('input')(
  (props: URLInputProps) => (defaultProps) =>
    `  
    margin-top: 6px;
    margin-bottom: 10px;
    cursor: text;
    width: calc(100% - 22px);
    font-size: 14px; 
    font-weight: 200;
    color: ${defaultProps.theme.palette.text.light};
    line-height: 20px;
    padding: 6px 10px 6px 10px; 
    border: 1px solid ${defaultProps.theme.palette.border};
    border-radius: 4px; 
    background-color: ${defaultProps.theme.palette.background.light};
  `
);

interface SourceSharePopoverProps {
  showSourceSharePopover: boolean;
  setShowSourceSharePopover: (bool: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
}

const SourceSharePopover = (props: SourceSharePopoverProps) => {
  const { showSourceSharePopover } = props;
  const [buttonContent, setButtonContent] = useState('Copy');

  const handleButtonClick = () => {
    if (buttonContent === 'Copy') {
      setButtonContent('✔︎ Copied');
    }
    copyToClipboard(window.location.href);
  };

  useEffect(() => {
    if (!showSourceSharePopover) {
      setButtonContent('Copy');
    }
  }, [showSourceSharePopover]);

  return (
    <PopoverContainer hide={!showSourceSharePopover}>
      Share URL <br />
      <URLInput disabled value={String(window.location.href)} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CopyButton onClick={handleButtonClick}>{buttonContent}</CopyButton>
      </div>
    </PopoverContainer>
  );
};

export default SourceSharePopover;
