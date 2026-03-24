import { Route, Routes } from 'react-router-dom'
import MyPlants from './pages/MyPlants'
import Calendar from './pages/Calendar'
import Todos from './pages/Todos'
import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return (
      <Routes>
      <Route path="/" element={<ProtectedRoute><MyPlants /></ProtectedRoute>} />
      <Route path="/my-plants" element={<ProtectedRoute><MyPlants /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
