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
        event.preventDefault();
        //Проверка заполненности полей
        if (isEmpty(this.state.login)) { //если не все поля заполнены
            document.getElementById("login").classList.add("auth-input-incorrect");
            document.getElementById("err").style.display = "block";
            return false;
        } else {
            document.getElementById("login").classList.remove("auth-input-incorrect");
        }
        ;

        if (isEmpty(this.state.password)) {
            document.getElementById("password").classList.add("auth-input-incorrect");
            document.getElementById("err").style.display = "block"
            return false;
        } else { //если все поля заполнены
            document.getElementById("password").classList.remove("auth-input-incorrect");
            document.getElementById("err").style.display = "none"
        };
        //Проверка длины пароля не меньше 8-ми символов
        if (this.state.password.length < 8) {
            document.getElementById("password").classList.add("auth-input-incorrect");
            document.getElementById("err_length_pass").style.display = "block"
            return false;
        } else {
            document.getElementById("password").classList.remove("auth-input-incorrect");
            document.getElementById("err_length_pass").style.display = "none"
        };

        //Отправка запроса авторизации
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
            document.getElementById("err_auth").style.display = "none"
            responseObj = xhrAuth.response;
            if (xhrAuth.status===200) {
                document.getElementById("err").style.display = "none"
                if (responseObj.hasOwnProperty('token')) {
                    //успешная авторизация
                    document.getElementById("err_auth").style.display = "none"
                    alert('Успешно авторизован пользователь: '+responseObj.username+', mail: ' +responseObj.email);
                } else {
                    //ошибка
                    console.log('ошибка учетных данных');
                    document.getElementById("err_auth").style.display = "block"
                }
            } else {
              //другая ошибка
              console.log('другая ошибка: ', responseObj);
              document.getElementById("err").style.display = "block"
            };
        };
    };

    render() {
        return (
            <div className="auth-container">
                <div className="auth-form-invisible">
                    <form onSubmit={this.handleSubmit}>
                        <div className="auth-form-visible brd-rad-med">
                            <input type="text" name="login" placeholder="Login" className="auth-input auth-input-correct brd-rad-medium" maxLength="255" id="login"
                            value = {this.state.login} onChange={this.handleChange} />
                            <span id="err_auth" className="auth-form-errors">Неверный логин/пароль</span>
                            <input type="password" name="password" placeholder="Password" className="auth-input auth-input-correct brd-rad-medium btm-elem" maxLength="255" id="password"
                            value = {this.state.password} onChange={this.handleChange} />
                            <span id="err" className="auth-form-errors">Не все поля заполнены</span>
                            <span id="err_length_pass" className="auth-form-errors">Пароль должен быть не короче 8-ми символов</span>
                        </div>
                        <button className="btn brd-rad-min">Join</button>
                    </form>
                    <span id="err_connection" className="auth-form-errors">Ошибка связи с сервером, попробуйте позже</span>

                </div>
            </div>
        );
    };
};

export default Auth;