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
        //Отправка запроса авторизации
        event.preventDefault();
        let auth_str = '{"username":"' + this.state.login + '","password":"' + this.state.password + '"}';
        let xhrAuth = new XMLHttpRequest();
        xhrAuth.open('POST', 'http://37.195.44.14:7878/api/v1/users/login', true);
        xhrAuth.setRequestHeader("Content-Type", "application/json");
        xhrAuth.setRequestHeader("Accept", "application/json, */*;q=0.5");
        xhrAuth.responseType = 'json';
        xhrAuth.send(auth_str);

        //Обработка ответа сервера
        let responseObj;
        xhrAuth.onload = function() {
            responseObj = xhrAuth.response;
        };
        if (!isEmpty(responseObj.error)) {
            alert('Ошибка авторизации: '+responseObj.error);            
        } else {
            alert('Успешно авторизован пользователь: '+responseObj.username+', mail: ' +responseObj.email); 
        };
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="login"
                value = {this.state.login} onChange={this.handleChange} /><br />
                <input type="password" name="password"
                value = {this.state.password} onChange={this.handleChange} /><br />
                <input type="submit" value="Войти" />
            </form>
        );
    };
};

export default Auth;