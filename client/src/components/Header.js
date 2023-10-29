import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                {this.props.title}
                <Link to="/" className='link'>Главная</Link>
                <Link to="/login" className='link'>Логин</Link>
                <Link to="/register" className='link'>Регистрация</Link>
            </header>
        )
    }
}

export default Header