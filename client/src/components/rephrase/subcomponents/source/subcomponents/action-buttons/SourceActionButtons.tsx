import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as CopyIcon } from 'src/assets/CopyIcon.svg';
import { ReactComponent as ShareIcon } from 'src/assets/ShareIcon.svg';
import { ReactComponent as SoundIcon } from 'src/assets/SoundIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';

const Fragment = styled('div')(
  () => `
    display: flex; 
    gap: 10px; 
        `
);

const Layout = styled('div')(
  () => `
    position: absolute;
    z-index: 3; 
    bottom: 16px;
    right: 22px;
    display: flex; 
    justify-content: space-between;  
    width: calc(100% - 44px); 
        `
);

interface SourceActionButtonsProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SourceActionButtons = (props: SourceActionButtonsProps) => {
  const { onClick } = props;
  return (
    <Layout>
      <Fragment>
        <Tooltip content='Listen' direction='top'>
          <IconButton
            onClick={onClick}
            icon={<SoundIcon />}
            variant='permanent'
          />
        </Tooltip>
      </Fragment>
      <Fragment>
        <Tooltip content='Copy to Clipboard' direction='top'>
          <IconButton
            onClick={onClick}
            icon={<CopyIcon />}
            variant='permanent'
          />
        </Tooltip>
        <Tooltip content='Share text' direction='top'>
          <IconButton
            onClick={onClick}
            icon={<ShareIcon />}
            variant='permanent'
          />
        </Tooltip>
      </Fragment>
    </Layout>
  );
};

export default SourceActionButtons;
