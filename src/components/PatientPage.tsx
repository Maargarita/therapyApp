import React, {useState, useEffect} from 'react'
import '../components_styles/PatientPage.scss'
import Complaint from './Complaint'
import DatePicker from 'react-date-picker'
import {Link} from 'react-router-dom'
import {db} from '../firebase'
import { collection, getDocs, addDoc } from "firebase/firestore"
import _ from 'lodash'

export function PatientPage() {
  const [dateValue, setDateValue] = useState(new Date());
  const [error, setError] = useState(false)
  const [reqError, setReqError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [sendForm, setSendForm] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [simptomsError, setSimptomsError] = useState(false)
  const [complaints, setComplaints] = useState([] as any)
  const [data, setData] = useState({})
  const body =  document.querySelector('body')
  
  //Получение заявок из базы данных
  async function fetchData(){ 
    await getDocs(collection(db, "complaints"))
      .then((querySnapshot)=>{              
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));
        setComplaints(newData)                            
      })
  }

  useEffect(()=>{
    fetchData();
  }, [])

  function formMessageClose(){
    setSendForm(false)
    body?.classList.remove('pop-up_open')
  }

  function updateData(e: any) {
    if(e.target.type != 'checkbox' && e.target.className != 'complaint__select'){
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
  }
    
    
  async function submit(e: any){
    e.preventDefault() 
    const dateValueTimestamp = new Date(dateValue).getTime()

    if(formValidation(e)){
      e.preventDefault()
      setError(false)

      let formComplaint = document.querySelectorAll('.complaint')
      let chexBoxChecked = 0
       
      //Отправка заяки с каждой жалобой отдельно для устранения избыточности в бд
      for(let item in formComplaint){
        if(typeof formComplaint[item] == 'object'){
          let chexBoxItem = formComplaint[item].querySelector("input[type=checkbox]") as HTMLInputElement
          if(chexBoxItem?.checked){
            chexBoxChecked++
            let selectValue = formComplaint[item].querySelector("select")?.value,
                select = formComplaint[item].querySelector("select")
        
            if(selectValue == "0"){
              select?.classList.add('error')
              setError(true)
              setSimptomsError(true)
            }else{
              select?.classList.remove('error')            
              sendApplication(data, e, chexBoxItem.id, dateValueTimestamp, selectValue) 
            }
          } 
        }
      }

      //Отправка заяки даже если отмеченных жалоб нет
      if(chexBoxChecked == 0){
        sendApplication(data, e, null, dateValueTimestamp, null) 
      }            
    }else{
      setError(true)
    }
  }
  
  //Отправка заявки
  async function sendApplication(data: object, e: any, chexBoxItemid: string|null, dateValueTimestamp: number, selectValue: string| null |undefined){
    e.preventDefault();
    try {
      await addDoc(collection(db, "applications"), {
        complaint_id: chexBoxItemid,  
        simptoms: selectValue,
        date: dateValueTimestamp,
        name: _.get(data, 'name'),  
        surname: _.get(data, 'surname'),
        email: (_.get(data, 'email') != undefined?  _.get(data, 'email') : null),
        phone: _.get(data, 'phone'),
        other: _.get(data, 'other')
      });
      setSendForm(true)
      setFormSuccess(true)
      body?.classList.add('pop-up_open')
    } catch (e) {
      setSendForm(true)
      setFormSuccess(false)
      console.error("Error adding document: ", e)
      body?.classList.add('pop-up_open')
    }
  }

  function formValidation(e: any) {
    let fields = e.target
    let datepicker = document.querySelector('.react-date-picker__wrapper')
    let formIsValid = true

    if (!fields["date"].value){
      formIsValid = false;
      setReqError(true)
      datepicker?.classList.add('error')        
    }else{
      datepicker?.classList.remove('error')
      setReqError(false)
    }
  
    if (!fields["name"].value){
      formIsValid = false;
      setReqError(true)
      e.target['name'].classList.add('error')        
    }else{
      e.target['name'].classList.remove('error')
      setReqError(false)
    }

    if (!fields["other"].value){
      formIsValid = false;
      setReqError(true)
      e.target['other'].classList.add('error')         
    }else{
      e.target['other'].classList.remove('error')
      setReqError(false)
    }

    if (!fields["surname"].value){
      formIsValid = false;
      setReqError(true)
      e.target['surname'].classList.add('error')         
    }else{
      e.target['surname'].classList.remove('error')
      setReqError(false)
    }

    if (!fields["phone"].value){
      formIsValid = false;
      setReqError(true)
      e.target['phone'].classList.add('error')         
    }else{
      let req = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      if(!req.test(fields["phone"].value)){
        formIsValid = false;
        setPhoneError(true)
        e.target['phone'].classList.add('error')  
      }else{
        e.target['phone'].classList.remove('error')
        setReqError(false)
        setPhoneError(false)
      }
    }

    if (fields["email"].value){
      let req = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if(!req.test(fields["email"].value)){
        formIsValid = false;
        setEmailError(true)
        e.target['email'].classList.add('error')  
      }else{
        e.target['email'].classList.remove('error')
        setEmailError(false)
      }
    }

    return formIsValid;
  }  
  
  return (
    <section className='patient-page'>
      
      <nav className='patient-page__nav-bar'>
         <Link className='patient-page__link' to='/'>На главную</Link>
      </nav>

      <div className='patient-page__container container'>
        
        <h1 className='patient-page__main-title'>Записаться на прием</h1>
        <h2 className='patient-page__title'>Укажите жалобы</h2>
        
        <form id="form" className='patient-page__form form' onSubmit={(e) => submit(e)}> 
          
          {complaints.map((item: any) =>{
            return <Complaint  key={item.id} {...item}/>
          })}      
         
          <label htmlFor="other" className='form__label'>Другие жалобы</label>
          <textarea className='form__input-textarea' id="other" name="other" onChange={(e) => updateData(e)} />
          <label className='form__label'>Выберете дату</label>
          <DatePicker className='form__datepicker' onChange={setDateValue} value={dateValue}/>
          <label className='form__label' htmlFor="name">Имя</label>
          <input className='form__input-text' type="text" id="name" name="name" onChange={(e) => updateData(e)} />
          <label className='form__label' htmlFor="surname">Фамилия</label>
          <input className='form__input-text'type="text" id="surname" name="surname" onChange={(e) => updateData(e)}  />
          <label className='form__label' htmlFor="phone">Телефон</label>
          <input className='form__input-text' type="text" id="phone" name="phone" onChange={(e) => updateData(e)} />
          <label className='form__label' htmlFor="email">Почта</label>
          <input className='form__input-text'type="text" id="email" name="email"  onChange={(e) => updateData(e)} />
          
          {error?
            <div className='form__errorbox errorbox'> 
  						<div className='errorbox__text'>
                {reqError? <p className='errorbox__text__item'>Пожалуйста, заполните все обязательные поля</p> : null}
                {emailError? <p className='errorbox__text__item'>Укажите, пожалуйста, корректный email</p> : null}
                {phoneError? <p className='errorbox__text__item'>Укажите, пожалуйста, корректный номер телефона</p> : null}
                {simptomsError? <p className='errorbox__text__item'>Укажите, пожалуйста, тяжесть симптомов</p> : null}
						  </div>
					  </div>
          : null}
          
          <button className='form__submit'>Отправить</button>

        </form>
      </div>  

      {sendForm? <FormSuccess success={formSuccess} formMessageClose={formMessageClose} /> : null }
    </section>
  )
}

interface FormSuccessProps{
  success: boolean,
  formMessageClose: () => void
}

function FormSuccess(props: FormSuccessProps){

  return(
    <div className='form-success'>
    <div className='form-success__area' onClick={props.formMessageClose}></div>

    <div className='form-success__body active'>
    
      {props.success? <div className='form-success__body__success'>Спасибо! Данные успешно отправлены.</div> :
      <div className='form-success__body__error'>Ошибка. Попробуйте еще раз.</div>}
		
    </div>

    <div onClick={props.formMessageClose} className='form-success__close'>{'\u{02716}'}</div>
</div>
  )
}