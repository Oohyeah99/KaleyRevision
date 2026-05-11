import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MathPage } from './pages/MathPage'
import { EssaysPage } from './pages/EssaysPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/math" element={<MathPage />} />
        <Route path="/essays" element={<EssaysPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
