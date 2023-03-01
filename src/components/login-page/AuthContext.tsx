import React, {createContext, ReactNode, useContext} from 'react'
import { auth } from '../../firebase'
import {signInWithEmailAndPassword } from "firebase/auth"

const AuthContext = createContext({} as AuthContext) 

export function useAuth(){
    return useContext(AuthContext)
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthContext ={
    logIn: (email: string, password: string) => void
}

export function AuthProvider({children}: AuthProviderProps) {

    function logIn(email: string, password: string){
        return signInWithEmailAndPassword(auth, email, password)
    }

  return (
    <AuthContext.Provider value={{ 
            logIn
        }}>
        {children}
    </AuthContext.Provider>
  )
} 