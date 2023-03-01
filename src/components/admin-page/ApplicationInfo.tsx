import React, { useEffect, useState } from 'react'
import { useApplicationInfo } from './ApplicationInfoContext'
import '../../components_styles/admin-page/ApplicationInfo.scss'
import {db} from '../../firebase'
import { collection, getDocs, addDoc, doc, deleteDoc} from "firebase/firestore"
import _ from 'lodash'

interface ApplicationInfoProps{
    id:string,
    docData: any,
    archive: boolean
}

function ApplicationInfo(props: ApplicationInfoProps) {
    const {closeInfo, setDeleted} = useApplicationInfo()
    const [complaints, setComplaints] = useState([] as any)
    
    //Перенос записи в архив
    async function addToArchive(stateValue: string, item: object){
        if(stateValue == 'confirmed' || stateValue == 'canceled'){
            try {
                await addDoc(collection(db, "archive"), {
                    complaint_id: _.get(item, 'complaint_id'),  
                    simptoms: _.get(item, 'simptoms'),
                    date: _.get(item, 'date'),
                    name: _.get(item, 'name'),  
                    surname: _.get(item, 'surname'),
                    email: _.get(item, 'email'),
                    phone: _.get(item, 'phone'),
                    other: _.get(item, 'other'),
                    state: (stateValue == 'confirmed'? 'Подтверждена' : 'Отменена' ) 
                });

                await deleteDoc(doc(db, "applications", `${_.get(item, 'id')}`))
                setDeleted(true)
                  
            } catch (e) {
                console.error("Error adding document: ", e);
                  
            }
        }
    }

    //Получение списка жалоб из базы данных
    async function fetchComplaintshData(){
        await getDocs(collection(db, "complaints"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                setComplaints(newData)                            
            })  
    }
    
    useEffect(()=>{
        fetchComplaintshData()
    }, [])

  return (
    <section className={`application-info`}>

        <div className='application-info__area' onClick={closeInfo}></div>
        
            {props.docData.map((item: any) => {
                let date = new Date(item.date).toLocaleString(
                    "ru-RU",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                  
                if(item.id == props.id){
                    return (            
                        <div key={item.id} className='application-info__body body'>
                            <h1 className='body__title'>Заявка на {date}</h1>

                            {complaints.map((citem: any) => {
                                if(item.complaint_id == citem.id){
                                    return (
                                        <div key={citem.id} className='body__complaint'>
                                            <p className='body__complaint__text'>Жалоба: {citem.name}</p>
                                            <p className='body__complaint__text'>Тяжесть симптомов: {item.simptoms}</p>
                                        </div> 
                                    )
                                }
                            })}
                            
                            
                            <p className='body__text'>Другие жалобы: {item.other}</p>
                            <p className='body__text'>Дата: {date}</p>
                            <p className='body__text'>Имя: {item.name}</p>
                            <p className='body__text'>Фамилия: {item.surname}</p>
                            <p className='body__text'>Телефон: {item.phone}</p>
                            <p className='body__text'>Почта: {item.email}</p>

                            {props.archive? <p className='body__text'>Статус: {item.state}</p>:
                                <>
                                    <label htmlFor='state'>Статус:</label>   
                                    <select name="state" id="state"  onChange={(e) => addToArchive(e.target.value, item)}>
                                        <option value="not_chosen">Не выбрано</option>
                                        <option value="confirmed">Подтверждена</option>
                                        <option value="canceled">Отменена</option>
                                    </select>
                                </>
                            }            
                                    
                        </div>
                    )
                }
            })}
                 
        <div className='application-info__close' onClick={closeInfo}>{'\u{02716}'}</div>

	</section>
  )
}

export default ApplicationInfo