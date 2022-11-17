import styled from '@emotion/styled';
import Dialog from 'src/components/general/dialog';
import IconButton from 'src/components/general/icon-button';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import { ReactComponent as ClearIcon } from 'src/assets/ClearIcon.svg';
import Button from '../general/button';

/* ---------------------------- Styled components --------------------------- */

const Container = styled('div')(
  () =>
    `  
    width: 280px;
    position: relative;
    padding: 8px 12px; 
      `
);

const Layout = styled('div')(
  () => `
  display: flex;
  flex-direction: column;
  justify-content: center;     
  margin: 16px; 
  `
);

const Heading = styled('span')(
  (defaultProps) => `
    font-size: 18px;
    font-weight: 600; 
    width: 100%; 
    text-align: center;
    color: ${defaultProps.theme.palette.primary.light};
    `
);

const Body = styled('span')(
  (defaultProps) => `
      font-size: 16px;
      padding-top: 8px;
      text-align: center;
      color: ${defaultProps.theme.palette.text.light};
      `
);

const ButtonLayout = styled('div')(
  () =>
    `  
      width: 100%;
      display: flex; 
      justify-content: center;   
      padding-bottom: 18px;   
    `
);

/* -------------------------------------------------------------------------- */
/*                              NotSupportedDialog                            */
/* -------------------------------------------------------------------------- */
interface NotSupportedDialogProps {
  open: boolean;
  setOpen: Function;
  heading: string;
  body: string;
}

const NotSupportedDialog = (props: NotSupportedDialogProps) => {
  const { open, setOpen, heading, body } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      transitionDuration={150}
      horizontalPosition='center'
      verticalPosition='center'
      darkenBackground={compareBreakpoint(activeBreakpoint, '<', '3XL')}
    >
      <Container>
        <Layout>
          <Heading>{heading}</Heading>
          <Body>{body}</Body>
        </Layout>
        <ButtonLayout>
          <Button onClick={() => setOpen(false)}> Understood </Button>
        </ButtonLayout>
      </Container>
    </Dialog>
  );
};

export default NotSupportedDialog;
