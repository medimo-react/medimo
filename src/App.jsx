import Medicine from './pages/Medicine/Medicine'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Info from './pages/Info/Info'
import Login from './pages/Login/Login'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AiSummary from "./pages/AiSummary/AiSummary.jsx";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={null} />
        <Route path="/medicine" element={<Medicine />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alert" element={ <Info />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/ai-summary" element={<AiSummary />} />
      </Route>
    </Routes>
  )
}

export default App
