import React from 'react';
import Header from './Header';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Login: '',
            Password: '',
            error: '',
            loginSuccess: false,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', this.state);
            if (response.data === 'User authenticated') {
                this.props.setAuthentication(true);
                this.setState({loginSuccess: true})
                localStorage.setItem('login', this.state.Login);
            }
        } catch (err) {
            this.setState({ error: err.response.data });
        }
    };

    render() {
        const { Login, Password } = this.state;
        return (<div>
            <Helmet>
                <title>Страница Авторизации</title>
            </Helmet>
            <Header className="header"></Header>
            <div className="loginPage__wrapper">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
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
                    <button type="submit">Авторизация</button>
                    {this.state.loginSuccess && (<Navigate to="/tasks" />)}
                </form>
            </div>
        </div>)
    }
}

export default LoginPage