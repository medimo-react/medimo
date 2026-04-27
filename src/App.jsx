// import Bookmark from './pages/Bookmark/Bookmark'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Info from './pages/Info/Info'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={null} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={ <Info />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    </Routes>
  )
}

export default App
