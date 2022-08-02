import './App.css';
import HomeComponent from './components/pages/HomeComponent';
import HeaderComponent from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';

function App() {
  return (
    <div className="App">
      <header>
        <HeaderComponent />
      </header>
      <div className="card m-2 mt-5">
        <HomeComponent />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
