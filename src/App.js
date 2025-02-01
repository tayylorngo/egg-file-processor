import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarTop from './components/NavbarTop/NavbarTop';
// import NavbarBottom from './components/NavbarBottom/NavbarBottom';
import "./App.css"
import Home from './Pages/Home/Home';
import HowToUse from './Pages/HowToUse/HowToUse';

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
        {/* <NavbarBottom /> */}
      </div>
    </Router>
  );
}

export default App;