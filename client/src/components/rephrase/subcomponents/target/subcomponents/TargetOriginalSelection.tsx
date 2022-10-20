import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useBoundStore from 'src/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';

interface ContainerProps {
  hide: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    `
    margin: 0px 22px 0px 22px;
    padding: 20px 6px 0px 8px;
    color: #888;
    font-size: 21px;
    font-weight: 300;
    position: relative;
    border-top: 1px solid ${addAlphaToHexColor(
      defaultProps.theme.palette.border,
      0.6
    )}; 
    opacity: ${props.hide ? '0' : '1'}; 

      transition: opacity 300ms ease-out;
    
      `
);

interface OriginalTextProps {
  hide: boolean;
  hasRendered: boolean;
}

const OriginalText = styled('div')(
  (props: OriginalTextProps) => (defaultProps) =>
    `
  
  white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 400;
    color: ${defaultProps.theme.palette.text.light};
    position: absolute;
    z-index: ${props.hide && !props.hasRendered ? -1 : 50};
    padding-top: 8px;
    cursor: pointer;
    width: calc(100% - 36px);
    font-size: 16.1px;
    line-height: 25px;

    &:hover {
      color: ${defaultProps.theme.palette.primary.main};
    }

    @supports (-webkit-line-clamp: 3) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }`
);

interface TargetOriginalSelectionProps {
  hide: boolean;
  resetToOriginalSelection: () => void;
}

const TargetOriginalSelection = (props: TargetOriginalSelectionProps) => {
  const { hide, resetToOriginalSelection } = props;
  const [hasRendered, setHasRendered] = useState(false);
  const theme = useTheme();
  const originalTextSelection = useBoundStore(
    (state) => state.uiState.originalTextSelection
  );

  useEffect(() => {
    if (!hide && !hasRendered) setHasRendered(true);
  }, [hide]);

  return (
    <Container hide={hide && !hasRendered}>
      Original:
      <OriginalText
        onClick={resetToOriginalSelection}
        hide={hide}
        hasRendered={hasRendered}
      >
        {originalTextSelection?.value}
      </OriginalText>
    </Container>
  );
};

export default TargetOriginalSelection;
