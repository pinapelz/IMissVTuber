import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";
import SchedulePage from "./pages/Schedule";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </BrowserRouter>
      <footer style={{ marginTop: '20px' }}>
        <a href="https://github.com/pinapelz/imisssomeone">Source Code</a>
        <p style={{ fontSize: '1rem' }}>Not affiliated with Phase Connect or Erina Makina</p>
      </footer>
    </>
  );
}

export default App;
