import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarTop from './components/NavbarTop/NavbarTop';
import DonateButton from './components/DonateButton/DonateButton';
// import NavbarBottom from './components/NavbarBottom/NavbarBottom';
import "./App.css"
import Home from './Pages/Home/Home';
import HowToUse from './Pages/HowToUse/HowToUse';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';

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
          <Route path="/privacy-policy" element={
            <>
              <PrivacyPolicy />
            </>
          } />
        </Routes>
        <DonateButton />
        {/* <NavbarBottom /> */}
      </div>
    </Router>
  );
}

export default App;