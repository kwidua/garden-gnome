import { Route, Routes } from 'react-router-dom'
import MyPlants from './pages/MyPlants'
import Calendar from './pages/Calendar'
import Todos from './pages/Todos'

function App() {

  return (
      <Routes>
      <Route path="/" element={<MyPlants />} />
      <Route path="/my-plants" element={<MyPlants />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  )
}

export default App
