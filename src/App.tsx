import { Route, Routes } from 'react-router-dom'
import './App.css'
import MyPlants from './pages/MyPlants'
import Calendar from './pages/Calendar'
import Todos from './pages/Todos'

function App() {

  return (
      <Routes>
      <Route path="/" element={<MyPlants />} />
      <Route path="/" element={<Calendar />} />
      <Route path="/" element={<Todos />} />
    </Routes>
  )
}

export default App
