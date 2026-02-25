import { useState } from 'react'
import AppRoutes from './Routes'
import './style.scss'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
