import AppBar from './components/appbar';
import Footer from './components/footer';
import RephrasePage from './pages/RephrasePage';

const App = () => {
  const activePage = <RephrasePage />;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      <AppBar />
      {activePage}
      <Footer />
    </div>
  );
};

export default App;
