import React,{ createContext, useEffect, useState }  from 'react'
import { getItem, setItem } from '../utils/LocalStorage';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    setItem();

    const { employees, admin } = getItem();
    setUserData({ employees, admin })
  }, [])

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      <div>{children}</div>
    </AuthContext.Provider>
  )
}

export default AuthProvider