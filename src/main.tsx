import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {PatientPage} from './components/PatientPage'
import AdminPage from './components/admin-page/AdminPage'
import ArchivePage from './components/archive-page/ArchivePage'
import LogInComponent from './components/login-page/LogInComponent'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/patient' element={<PatientPage />} />
        <Route path='/login' element={<LogInComponent />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/archive' element={<ArchivePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
