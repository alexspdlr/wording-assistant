import AppBar from './components/appbar';
import RephrasePage from './pages/RephrasePage';

const App = () => {
  const activePage = <RephrasePage />;
  return (
    <div className='App'>
      <AppBar />
      {activePage}
    </div>
  );
};

export default App;
