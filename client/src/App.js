import "./index.css"
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import MainPage from './components/MainPage';
import TaskPage from './components/TaskPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

class App extends React.Component {
  // Конструктор со значением аутентификации пользователя
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
  }
  // Метод аутентификации пользователя (запись)
  setAuthentication = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };

  // Рендер компонента
  render() {
    return (<div className="App">
      <Helmet><title>Главная страница</title></Helmet>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/login" element={<LoginPage setAuthentication={this.setAuthentication}/>}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/tasks" element={this.state.isAuthenticated ? (<TaskPage />) : (<Navigate to="/login"/>)}/>
        </Routes>
      </BrowserRouter>
    </div>);
  }
}

export default App;
