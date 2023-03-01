import React from 'react'
import { AuthProvider} from './AuthContext'
import LogInPage from './LogInPage'

function LogInComponent() {
  return (
    <AuthProvider>
        <LogInPage />
    </AuthProvider>
  )
}

export default LogInComponent