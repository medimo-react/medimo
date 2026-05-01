import Medicine from './pages/Medicine/Medicine'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Demo from './components/Demo'
import Info from './pages/Info/Info'
import Login from './pages/Login/Login'
import Signup1 from './pages/Login/Signup1.jsx'
import Signup2 from './pages/Login/Signup2.jsx'
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AiSummary from "./pages/AISummary/AISummary.jsx";
import About from "./pages/About/About.jsx";
import History from "./pages/History/History.jsx";
import { useInfoStore } from './store/infoStore.js'

function App() {
  const { schedules, alarms } = useInfoStore()
  const doneCount = schedules.filter((s) => s.done).length;
  const rate = schedules.length > 0 ? Math.round((doneCount / schedules.length) * 100) : 0;
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup1" element={<Signup1 />} />
      <Route path="/signup2" element={<Signup2 />} />

      <Route element={<AppLayout />}>
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/dashboard" element={<Dashboard rate={rate} alarms={alarms} />} />
        <Route path="/alert" element={<Info rate={rate} alarms={alarms} />} />
        <Route path="/history" element={ <History />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/ai-summary" element={<AiSummary />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
