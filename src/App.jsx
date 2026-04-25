import Bookmark from './pages/Bookmark/Bookmark'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={null} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Route>
    </Routes>
  )
}

export default App
