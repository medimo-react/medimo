import Bookmark from './pages/Bookmark/Bookmark'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Info from './pages/Info/Info'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AlSummary from "./pages/AISummary/AlSummary.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={null} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={ <Info />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/ai-summary" element={<AlSummary />} />
      </Route>
    </Routes>
  )
}

export default App
