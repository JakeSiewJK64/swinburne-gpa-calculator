import './App.css';
import HomeComponent from './components/pages/HomeComponent';
import HeaderComponent from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import { useState } from 'react';

function App() {

  const [darkmode, setDarkmode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
  });

  const setTheme = () => {
    setDarkmode(!darkmode);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <HeaderComponent setTheme={setTheme} />
        <div className="card">
          <HomeComponent />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
