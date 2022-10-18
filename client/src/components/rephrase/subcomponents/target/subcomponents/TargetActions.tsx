import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as CheckIcon } from 'src/assets/check.svg';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';
import useBoundStore from 'src/store';

const Fragment = styled('div')(
  () => `
    display: flex; 
    gap: 10px; 
    font-size: 14px; 
    font-weight: 300; 
        `
);

const Layout = styled('div')(
  () => `
    position: absolute;
    z-index: 3; 
    bottom: 12px;
    right: 22px;
    display: flex; 
    justify-content: space-between;  
    width: calc(100% - 44px);  
    align-items: center; 
        `
);

interface TargetActionsProps {
  resetToOriginalSelection: () => void;
}

const TargetActions = (props: TargetActionsProps) => {
  const { resetToOriginalSelection } = props;
  const targetTextLength = useBoundStore(
    (state) => state.uiState.activeTextSelection?.value.length
  );
  const deselectText = useBoundStore((state) => state.deselectText);

  return (
    <Layout>
      <Fragment>
        {targetTextLength && `Selected: ${targetTextLength} / 1000`}
      </Fragment>
      <Fragment>
        <Tooltip content='Decline text' direction='top'>
          <IconButton
            onClick={resetToOriginalSelection}
            icon={<ClearIcon />}
            variant='permanent'
          />
        </Tooltip>
        <Tooltip content='Accept text' direction='top'>
          <IconButton
            onClick={() => deselectText()}
            icon={<CheckIcon />}
            variant='permanent'
          />
        </Tooltip>
      </Fragment>
    </Layout>
  );
};

export default TargetActions;
