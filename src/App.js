import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarTop from './components/NavbarTop/NavbarTop';
import NavbarBottom from './components/NavbarBottom/NavbarBottom';
import "./App.css"
import Home from './Home';
import HowToUse from './HowToUse/HowToUse';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarTop />
        <Routes>
          <Route path="/" element={
            <>
              <Home/>
            </>
          } />
          <Route path="/how-to-use" element={
            <>
              <HowToUse />
            </>
          } />
        </Routes>
        <NavbarBottom />
      </div>
    </Router>
  );
}

export default App;