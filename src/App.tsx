import { Route, Routes, BrowserRouter } from "react-router-dom";
import './styles/App.css'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
