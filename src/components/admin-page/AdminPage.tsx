import React from 'react'
import { ApplicationInfoProvider } from './ApplicationInfoContext'
import AdminPageContent from './AdminPageContent'

function AdminPage() {
  return (
    <ApplicationInfoProvider>
        <AdminPageContent />
    </ApplicationInfoProvider>
  )
}

export default AdminPage