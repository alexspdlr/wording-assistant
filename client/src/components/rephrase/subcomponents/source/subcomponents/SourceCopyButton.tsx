import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as CopyIcon } from 'src/assets/CopyIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';

const Layout = styled('div')(
  () => `
    position: absolute;
    bottom: 8px;
    right: 16px;
    display: flex;
        `
);

interface SourceCopyButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SourceCopyButton = (props: SourceCopyButtonProps) => {
  const { onClick } = props;
  return (
    <Layout>
      <Tooltip content='Copy to Clipboard' direction='top'>
        <IconButton onClick={onClick} icon={<CopyIcon />} variant='permanent' />
      </Tooltip>
    </Layout>
  );
};

export default SourceCopyButton;
