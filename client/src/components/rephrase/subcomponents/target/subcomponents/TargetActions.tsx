import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as CheckIcon } from 'src/assets/check.svg';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';

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

interface TargetActionsProps {}

const TargetActions = (props: TargetActionsProps) => {
  const length = 431;

  return (
    <Layout>
      <Fragment> &nbsp;&nbsp;Selected: {length} / 1000</Fragment>
      <Fragment>
        <Tooltip content='Decline text' direction='top'>
          <IconButton
            onClick={() => null}
            icon={<ClearIcon />}
            variant='permanent'
          />
        </Tooltip>
        <Tooltip content='Accept text' direction='top'>
          <IconButton
            onClick={() => null}
            icon={<CheckIcon />}
            variant='permanent'
          />
        </Tooltip>
      </Fragment>
    </Layout>
  );
};

export default TargetActions;
