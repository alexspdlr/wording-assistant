import AppBar from './components/appbar';
import AppBody from './components/appbody';
import RephrasePage from './pages/RephrasePage';

const App = () => {
  const activePage = <RephrasePage />;
  return (
    <div className='App'>
      <AppBar />
      <AppBody>{activePage}</AppBody>
    </div>
  );
};

export default App;
