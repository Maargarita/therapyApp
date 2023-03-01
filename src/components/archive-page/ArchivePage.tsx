import React from 'react'
import { ApplicationInfoProvider } from '../admin-page/ApplicationInfoContext'
import ArchivePageContent from './ArchivePageContent'

function ArchivePage() {
  return (
    <ApplicationInfoProvider>
        <ArchivePageContent />
    </ApplicationInfoProvider>
  )
}

export default ArchivePage