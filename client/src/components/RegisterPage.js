import React from 'react';
import Header from './Header';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            FirstName: '',
            LastName: '',
            MiddleName: '',
            Login: '',
            Password: '',
            SupervisorID: "",
            error: '',
            registrationSuccess: false, 
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/register', this.state);
            this.setState({registrationSuccess: true})
        } catch (err) {
            this.setState({ error: err.response.data });
        }
    };

    render() {
        const { FirstName, LastName, MiddleName, Login, Password, SupervisorID } = this.state;
        return (<div>
            <Helmet><title>Страница Регистрации</title></Helmet>
            <Header className="header"></Header>
            <div className="registerPage__wrapper">
                <h1>Регистрация</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="FirstName"
                        placeholder="Имя"
                        value={FirstName}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="LastName"
                        placeholder="Фамилия"
                        value={LastName}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="MiddleName"
                        placeholder="Отчество"
                        value={MiddleName}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="Login"
                        placeholder="Логин"
                        value={Login}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Пароль"
                        value={Password}
                        onChange={this.handleChange}
                    />
                    <input
                        type="supervisor"
                        name="SupervisorID"
                        placeholder="Ответственный"
                        value={SupervisorID}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Регистрация</button>
                    {this.state.registrationSuccess && (<Navigate to="/login" />)}
                </form>
            </div>
        </div>)
    }
}

export default RegisterPage