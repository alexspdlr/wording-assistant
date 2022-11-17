import styled from '@emotion/styled';
import { ReactComponent as CheckIcon } from 'src/assets/check.svg';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';
import { MAX_SOURCE_SELECTION_LENGTH } from 'src/constants';
import useBoundStore from 'src/store';

/* ---------------------------- Styled components --------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                TargetActions                               */
/* -------------------------------------------------------------------------- */

interface TargetActionsProps {
  resetToOriginalSelection: () => void;
}

const TargetActions = (props: TargetActionsProps) => {
  const { resetToOriginalSelection } = props;
  const originalTextLength = useBoundStore(
    (state) => state.uiState.originalTextSelection?.value.length
  );
  const deselectText = useBoundStore((state) => state.deselectText);

  return (
    <Layout>
      <Fragment>
        {originalTextLength &&
          `Selected: ${originalTextLength} / ${MAX_SOURCE_SELECTION_LENGTH}`}
      </Fragment>
      <Fragment>
        <Tooltip content='Decline' direction='top'>
          <IconButton
            onClick={resetToOriginalSelection}
            icon={<ClearIcon />}
            variant='permanent'
          />
        </Tooltip>
        <Tooltip content='Accept' direction='top'>
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
