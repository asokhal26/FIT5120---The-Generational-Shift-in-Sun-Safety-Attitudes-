import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navigation/Navbar'
import Home from './pages/Home/Home'
import './App.css'

export default function App() {
  return (
    <div className="phone-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* other pages */}
      </Routes>
      <Navbar />
    </div>
  )
}
