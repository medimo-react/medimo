// import Bookmark from './pages/Bookmark/Bookmark'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/bookmark" element={<Bookmark />} /> */}
        <Route path="/demo" element={<Demo />} />
      </Route>
    </Routes>
  )
}

export default App
