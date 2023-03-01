import React from 'react'
import { useApplicationInfo } from './ApplicationInfoContext'
import '../../components_styles/admin-page/ApplicationItem.scss'

interface ApplicationItemProps{
  date: number
  id: string,
  docData: any,
  archive: boolean
}

function ApplicationItem(props: ApplicationItemProps) {
    const {openInfo} = useApplicationInfo()
    let date = new Date(props.date).toLocaleString(
      "ru-RU",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    
  return (
    <div className='application'>
        <h2 className='application__title'>Заявка на {date}</h2>
        <a onClick={() => openInfo(props.id, props.archive, props.docData)} className='application__button'>Подробнее</a>
    </div>
  )
}

export default ApplicationItem