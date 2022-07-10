import RephrasePage from '../pages/RephrasePage';
import AppBar from './AppBar';
import AppBody from './AppBody';

const AppLayout = () => {
  return (
    <>
      <AppBar />
      <AppBody>
        {/* TODO: Dynamically render page content based on route */}
        <RephrasePage />
      </AppBody>
    </>
  );
};

export default AppLayout;
