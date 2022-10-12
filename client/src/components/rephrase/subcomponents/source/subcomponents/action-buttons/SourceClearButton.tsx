import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import IconButton from 'src/components/general/icon-button';

const Layout = styled('div')(
  () => `
      position: absolute;
      top: 16px;
      right: 16px;
          `
);

interface SourceClearButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SourceClearButton = (props: SourceClearButtonProps) => {
  const { onClick } = props;
  return (
    <Layout>
      <IconButton onClick={onClick} icon={<ClearIcon />} variant='dynamic' />
    </Layout>
  );
};

export default SourceClearButton;
