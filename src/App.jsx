import Bookmark from './pages/Bookmark/Bookmark'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Info from './pages/Info/Info'
import Login from './pages/Login/Login'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AlSummary from "./pages/AISummary/AlSummary.jsx";
import Guide from "./pages/Guide/Guide";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={null} />
        <Route path="/bookmark" element={<Bookmark />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={ <Info />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/ai-summary" element={<AlSummary />} />
        <Route path="/guide" element={<Guide />} />
      </Route>
    </Routes>
  )
}

export default App
