import React, { useContext, useState, createContext, ReactNode } from 'react'
import ApplicationInfo from './ApplicationInfo'

const ApplicationInfoContext = createContext({} as ApplicationInfoContext)

export function useApplicationInfo(){
    return useContext(ApplicationInfoContext)
}

type ApplicationInfoProviderProps = {
    children: ReactNode
}

type ApplicationInfoContext ={
    openInfo: (id:string, archive: boolean, docData: any) => void
    closeInfo: () => void
    deleted: boolean
    setDeleted: any,
}

export function ApplicationInfoProvider({children} : ApplicationInfoProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [archive, setArchive] = useState(false)
    const [id, setId] = useState('')
    const [docData, setDocData] = useState([] as any)
    const body =  document.querySelector('body')

    function openInfo(id:string, archive: boolean, docData: any){
        setId(id)
        setIsOpen(true)
        setArchive(archive)
        setDocData(docData)
        body?.classList.add('pop-up_open')
    }

    function closeInfo(){
        setIsOpen(false)
        body?.classList.remove('pop-up_open')
    }

    return (
        <ApplicationInfoContext.Provider value={{
                openInfo,
                closeInfo,
                deleted, 
                setDeleted
            }}>
            {children}
            {isOpen? <ApplicationInfo id={id} archive={archive} docData={docData} /> : null}
        </ApplicationInfoContext.Provider>
    )
        
}