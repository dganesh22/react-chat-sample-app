import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../fireConfig'

export const AuthContext = createContext()

function AuthProvider(props) {
    // current user info after login authentication
const  [currentUser,setCurrentUser] = useState(false)

// current login user info
useEffect(() => {
  // invoke on mount
  const unsub = onAuthStateChanged(auth, user=>{
    console.log(`user info`, user)
    setCurrentUser(user)
  })

  return () => {
    unsub() // call on unmount
  }
},[])



  return (
    <AuthContext.Provider value={{ currentUser }} >
            {
                props.children
            }
    </AuthContext.Provider>
  )
}

export default AuthProvider