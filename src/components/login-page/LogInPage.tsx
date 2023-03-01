import React, {useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import '../../components_styles/LogInPage.scss'
import {useAuth} from './AuthContext'

function LogInPage() {
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const {logIn} = useAuth()

    async function formSubmit(e:any){
        e.preventDefault()
        try{
            await logIn(emailRef.current.value, passwordRef.current.value)
            setError(false)
            navigate('/admin')
        }catch{
            setError(true)
        }
    }

    return (

        <section className='login-page'>
            <nav className='login-page__nav-bar'>
            <Link className='login-page__link' to='/'>На главную</Link>
            </nav>

            <div className='login-page__container container'>
                <h1 className='login-page__title'>Авторизация</h1>
                <form className='login-page__form form' onSubmit={(e) => formSubmit(e)}>
                    <label className='form__label' htmlFor="email">Логин</label>
                    <input className='form__input-text' type="text" id="email" name="email" ref={emailRef} />
                    <label className='form__label' htmlFor="password">Пароль</label>
                    <input className='form__input-text' type="password" id="password" name="password" ref={passwordRef} />

                    {error?
                        <div className='form__errorbox errorbox'> 
  						    <div className='errorbox__text'>
                                <p className='errorbox__text__item'>Неверный логин или пароль</p>
						    </div>
					    </div>
                    : null}
                    <button className='form__submit'>Войти</button>
                </form>
            </div>
        </section>    
  )
}

export default LogInPage