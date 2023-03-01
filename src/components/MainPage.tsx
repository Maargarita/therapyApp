import React from 'react'
import {Link} from 'react-router-dom'
import '../components_styles/MainPage.scss'

function MainPage() {
  return (
    <section className='main-page'>
        <div className='main-page__container container'>
            <h1 className='main-page__title'>Добро пожаловать</h1>
            <p className='main-page__text'>Выберете роль</p>
            <Link className='main-page__link' to='/patient'>Пациент</Link>
            <Link className='main-page__link' to='/login'>Администратор</Link>
        </div>
    </section>
  )
}

export default MainPage