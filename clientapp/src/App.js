import './App.css';
import HomeComponent from './components/pages/HomeComponent';
import HeaderComponent from './components/shared/Header/Header';

function App() {
  return (
    <div className="App">
      <header>
        <HeaderComponent />
      </header>
      <div className="card m-2 mt-5">
        <HomeComponent />
      </div>
    </div>
  );
}

export default App;
