import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../components_styles/admin-page/AdminPage.scss'
import {db} from '../../firebase'
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import ApplicationItem from '../admin-page/ApplicationItem'

function ArchivePage() {
  const [docData, setDocData] = useState([] as any);

  //Получение заявок из базы данных
  async function fetchData(){
    await getDocs(query(collection(db, "archive"), orderBy('date')))
      .then((querySnapshot)=>{              
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setDocData(newData)                            
      })     
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
      <section className='admin-page'>

        <nav className='admin-page__nav-bar'>
          <Link className='admin-page__link' to='/'>На главную</Link>
          <Link className='admin-page__link' to='/admin'>Заявки</Link>
        </nav>

        <div className='admin-page__container container'>

          {docData.map((item: any) => {
            return <ApplicationItem key={item.id} {...item} archive={true} docData={docData} />  
          })}

        </div>  
      </section>
  )
}

export default ArchivePage