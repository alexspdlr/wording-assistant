import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import CustomPopover from 'src/components/Popover';
import useBoundStore from 'src/store';
import { TextToken } from 'src/types/store';
import addAlphaToHexColor from 'src/utils/addAlphaToHexColor';
import useClickAway from 'src/utils/hooks/useClickAway';
import useRephraseToolTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import useSourceTextboxSize from 'src/utils/hooks/useRephraseToolTextboxSize';
import splitIntoWords from 'src/utils/splitIntoWords';
import { TargetCursorIndexInfo } from '../RephraseTarget';
import _ from 'lodash';

interface ContainerProps {
  hide: boolean;
}

const Container = styled('div')(
  (props: ContainerProps) => (defaultProps) =>
    `
    margin: 0px 22px 0px 22px;
    padding: 10px 6px 0px 6px;
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
      <div
        onClick={resetToOriginalSelection}
        style={{
          fontWeight: 400,
          color: theme.palette.text.main,
          position: 'absolute',
          zIndex: hide && !hasRendered ? -1 : 50,
          paddingTop: '14px',
          cursor: 'pointer',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: 'calc(100% - 36px)',
        }}
      >
        {originalTextSelection?.value}
      </div>
    </Container>
  );
};

export default TargetOriginalSelection;
