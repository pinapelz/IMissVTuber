import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <a href="https://github.com/pinapelz/imisssomeone">Source Code</a>
        <p>Not affiliated with Phase Connect or Erina Makina</p>
      </footer>
    </>
  );
}

export default App;
