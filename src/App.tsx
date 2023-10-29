import { Route, Routes, BrowserRouter } from "react-router-dom";
import './styles/App.css'
import Footer from "./components/Footer";
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  )
}

export default App
