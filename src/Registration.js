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
        event.preventDefault();
        //Проверка заполненности полей

        if (isEmpty(this.state.email)) { // не все /*обязательные*/ поля заполнены
            document.getElementById("email").classList.add("registration-input-incorrect");
            document.getElementById("err").style.display = "block"
            return false;
        } else {
            document.getElementById("email").classList.remove("registration-input-incorrect");
            document.getElementById("err").style.display = "none"
        };

        if (isEmpty(this.state.login)) {
            document.getElementById("login").classList.add("registration-input-incorrect");
            document.getElementById("err").style.display = "block"
            return false;
        } else {
            document.getElementById("login").classList.remove("registration-input-incorrect");
            document.getElementById("err").style.display = "none"
        };

        if (isEmpty(this.state.password1)) {
            document.getElementById("password1").classList.add("registration-input-incorrect");
            document.getElementById("err").style.display = "block"
            return false;
        } else {
            document.getElementById("password1").classList.remove("registration-input-incorrect");
            document.getElementById("err").style.display = "none"
        };

        if (isEmpty(this.state.password2)) {
            document.getElementById("password2").classList.add("registration-input-incorrect");
            document.getElementById("err").style.display = "block"
            return false;
        } else {
            document.getElementById("password2").classList.remove("registration-input-incorrect");
            document.getElementById("err").style.display = "none"
        };

        //Проверка длины пароля не меньше 8-ми символов
        if (this.state.password1.length < 8) {
            document.getElementById("err_length_pass").style.display = "block"
            document.getElementById("password1").classList.add("registration-input-incorrect");
            return false;
        } else {

            document.getElementById("password1").classList.remove("registration-input-incorrect");
            document.getElementById("err_length_pass").style.display = "none"
        };

        //Проверка совпадения паролей
        if (!isEmpty(this.state.password1) === true && !isEmpty(this.state.password2)
        && this.state.password1 !== this.state.password2) {
            document.getElementById("err2").style.display = "block"
            document.getElementById("password1").classList.add("registration-input-incorrect");
            document.getElementById("password2").classList.add("registration-input-incorrect");
            return false;
        } else {
            document.getElementById("err2").style.display = "none"
            document.getElementById("password1").classList.remove("registration-input-incorrect");
            document.getElementById("password2").classList.remove("registration-input-incorrect");
        };

        //Отправка запроса на регистрацию
        //сериализировать JSON
        let registration_str = '{"username":"' + this.state.login + '","password":"' + this.state.password2 + '","email":"' + this.state.email + '"}';

        let xhrReg = new XMLHttpRequest();
        xhrReg.open('POST', 'http://37.195.44.14:7878/api/v1/users', true);
        xhrReg.setRequestHeader("Content-Type", "application/json", "Accept");
        xhrReg.responseType = 'json';
        xhrReg.send(registration_str);

        //Обработка ответа сервера
        let responseObj;
        xhrReg.onload = function() {
            responseObj = xhrReg.response;
            console.log('response: ', responseObj)
            if (xhrReg.status===201) {
                alert('Успешно зарегистрирован пользователь: '+responseObj.username+', mail: ' +responseObj.email);
            };
        };
    };

    render() {
    return (
    <div className="registration-container">
        <div className="registration-form-invisible">
            <form onSubmit={this.handleSubmit}>
                <div className="registration-form-visible brd-rad-med">
                    <input type="email" name="email" placeholder="E-mail" className="registration-input registration-input-correct brd-rad-medium" id="email"
                    value = {this.state.email} onChange={this.handleChange} />
                    <input type="text" name="login" placeholder="Login" className="registration-input registration-input-correct brd-rad-medium" maxLength="255" id="login"
                    value = {this.state.login} onChange={this.handleChange} />
                    <input type="password" name="password1" placeholder="Password" className="registration-input registration-input-correct brd-rad-medium" id="password1"
                    value = {this.state.password} onChange={this.handleChange} />
                    <input type="password" name="password2" placeholder="Re-enter password" className="registration-input registration-input-correct brd-rad-medium btm-elem" id="password2"
                    value = {this.state.password} onChange={this.handleChange} />
                    <span id="err" className="registration_form_errors">Не все поля заполнены</span>
                    <span id="err2" className="registration_form_errors">Пароли не совпадают</span>
                    <span id="err_length_pass" className="registration_form_errors">Пароль должен быть не короче 8-ми символов</span>
                </div>
                <button className="btn brd-rad-min">Registry</button>
            </form>
        </div>
    </div>)};
};

export default Registration;