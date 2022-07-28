import AppBar from './components/appbar';
import Footer from './components/footer';
import RephrasePage from './pages/RephrasePage';

const App = () => {
  const activePage = <RephrasePage />;
  return (
    <div className='App'>
      <AppBar />
      {activePage}
      <Footer />
    </div>
  );
};

export default App;
