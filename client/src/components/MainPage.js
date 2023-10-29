import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css"
import Header from './Header'

class MainPage extends React.Component {
    render() {
        return (
            <div className='mainPage__wrapper'>
                <Header />
                <h1>Наше приложения создано для отслеживания ваших задач</h1>
                <h2>Нажмите <i><Link to="/login" className='mainPage__link'>Логин</Link></i> для авторизации</h2>
                <h2>Если вы ещё не зарегистрированы, нажмите <i><Link to="/register" className='mainPage__link'>Регистрация</Link></i></h2>
            </div>
        )
    }

}

export default MainPage