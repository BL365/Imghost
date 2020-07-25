import React from 'react';
import './Registration.css';
import { isEmpty } from 'underscore';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password1: '', password2: '', email: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        
        //Проверка совпадения паролей
            if (!isEmpty(this.state.password1) === true && !isEmpty(this.state.password2) 
        && this.state.password1 !== this.state.password2) {
            alert('пароли не совпадают');
            return false;
        };

        //Отправка запроса на регистрацию
        let registration_str = '{"username":"' + this.state.login + '","password":"' + this.state.password2 + '","email":' + this.state.email + '"}';
        event.preventDefault();
        let xhrReg = new XMLHttpRequest();
        xhrReg.open('POST', 'http://37.195.44.14:7878/api/v1/users', true);
        xhrReg.setRequestHeader("Content-Type", "application/json");
        xhrReg.setRequestHeader("Accept", "application/json, */*;q=0.5");
        xhrReg.responseType = 'json';
        xhrReg.send(registration_str);

        //Обработка ответа сервера
        let responseObj;
        xhrReg.onload = function() {
            responseObj = xhrReg.response;
        };
        alert(responseObj);
        // if (!isEmpty(responseObj.error)) {
        //     alert('Ошибка регистрации: ');//+responseObj.error            
        // } else {
        //     alert('Успешно зарегистрирован пользователь: '); //+responseObj.username+', mail: ' +responseObj.email
        // };
    };

    render() {
        return (
        <div className="Registration">
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="email" placeholder="E-mail"
                value = {this.state.email} onChange={this.handleChange} /><br />
                <input type="text" name="login" placeholder="Login"
                value = {this.state.login} onChange={this.handleChange} /><br />
                <input type="password" name="password1" placeholder="Password"
                value = {this.state.password} onChange={this.handleChange} /><br />
                <input type="password" name="password2" placeholder="Re-enter password"
                value = {this.state.password} onChange={this.handleChange} /><br />
                <input type="submit" value="Зарегистрироваться" />
            </form>
        </div>
        );
    };
};

export default Registration;