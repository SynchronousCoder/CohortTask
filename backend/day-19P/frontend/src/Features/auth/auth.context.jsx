import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider(props){

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
      {props.children}
    </AuthContext.Provider>
  )
}