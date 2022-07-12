import Dialog from 'src/components/general/dialog';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

interface AppBarMenuDialogProps {
  open: boolean;
  setOpen: Function;
}

const AppBarMenuDialog = (props: AppBarMenuDialogProps) => {
  const { open, setOpen } = props;
  const activeBreakpoint = useBreakpoint();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      transitionDuration={200}
      horizontalPosition='end'
      verticalPosition='start'
      darkenBackground={compareBreakpoint(activeBreakpoint, '<', '3XL')}
    >
      {/* TODO: Replace example menu with menu component */}
      <p style={{ height: 700, width: 340 }}>
        hi there <button onClick={() => setOpen(false)}>close</button>
      </p>
    </Dialog>
  );
};

export default AppBarMenuDialog;
