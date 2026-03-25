import { useState } from 'react'
import AppRoutes from './AppRoutes'
import './style.scss'
import { AuthProvider } from './features/auth/auth.context'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </>
  )
}

export default App
