import React from 'react';
import './Auth.css';
import { isEmpty } from 'underscore';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit(event) {

        //Проверка заполненности полей
        if (isEmpty(this.state.login) || isEmpty(this.state.password)) {
            return false;
        };

        //Отправка запроса авторизации
        event.preventDefault();
        //сериализировать JSON
        let auth_str = '{"username":"' + this.state.login + '","password":"' + this.state.password + '"}';
        let xhrAuth = new XMLHttpRequest();
        xhrAuth.open('POST', 'http://37.195.44.14:7878/api/v1/users/login', true);
        xhrAuth.setRequestHeader("Content-Type", "application/json", "Accept");
        xhrAuth.responseType = 'json';
        xhrAuth.send(auth_str);

        //Обработка ответа сервера
        let responseObj;
        xhrAuth.onload = function() {
            responseObj = xhrAuth.response;
            if (xhrAuth.status===200) {
                if (responseObj.hasOwnProperty('token')) {
                    //успешная авторизация
                    alert('Успешно авторизован пользователь: '+responseObj.username+', mail: ' +responseObj.email);
                } else {
                    //ошибка
                    console.log('ошибка учетных данных');
                }
            } else {
              //другая ошибка
              console.log('другая ошибка: ', responseObj);
            };
        };
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="login" placeholder="Login"
                value = {this.state.login} onChange={this.handleChange} /><br />
                <input type="password" name="password" placeholder="Password"
                value = {this.state.password} onChange={this.handleChange} /><br />
                <input type="submit" value="Войти" />
            </form>
        );
    };
};

export default Auth;