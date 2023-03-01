import React, {useEffect, useState} from 'react'
import '../../components_styles/admin-page/AdminPage.scss'
import {Link} from 'react-router-dom'
import ApplicationItem from './ApplicationItem'
import {db} from '../../firebase'
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import _ from 'lodash'
import { useApplicationInfo } from './ApplicationInfoContext'

function AdminPage() {
  const [docData, setDocData] = useState([] as any)
  const {deleted, setDeleted} = useApplicationInfo()

  //Получение заявок из базы данных
  async function fetchData(){
    await getDocs(query(collection(db, "applications"), orderBy('date')))
      .then((querySnapshot)=>{              
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setDocData(newData)                            
      })  
  }
  
  useEffect(()=>{
    fetchData()
  }, [])

  //Обновление списка после перенооса заявки в архив
  useEffect(()=>{
    if(deleted == true){
      fetchData()
      setDeleted(false)
    }
  }, [deleted])

  return (
      <section className='admin-page'>

        <nav className='admin-page__nav-bar' >
          <Link className='admin-page__link' to='/'>На главную</Link>
          <Link className='admin-page__link' to='/archive'>Архив</Link>
        </nav>

        <div className='admin-page__container container'>

          {docData.map((item: any) => {
            //docData передается для уменьшения обращений к бд
            return <ApplicationItem key={item.id} {...item} archive={false} docData={docData}/>  
          })}
          
          </div>  
      </section>
  )
}

export default AdminPage