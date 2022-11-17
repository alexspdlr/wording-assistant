import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as ShareIcon } from 'src/assets/ShareIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';

/* ---------------------------- Styled components --------------------------- */

const Layout = styled('div')(
  () => `
    position: absolute;
    z-index: 3; 
    bottom: 10px;
    right: 16px;
    display: flex; 
        `
);

/* -------------------------------------------------------------------------- */
/*                              SourceShareButton                             */
/* -------------------------------------------------------------------------- */

interface SourceShareButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const SourceShareButton = (props: SourceShareButtonProps) => {
  const { onClick } = props;
  return (
    <Layout>
      <Tooltip content='Share text' direction='top'>
        <IconButton
          onClick={onClick}
          icon={<ShareIcon />}
          variant='permanent'
        />
      </Tooltip>
    </Layout>
  );
};

export default SourceShareButton;
