import React from 'react';
import App from './App';
import Auth from './Auth';
import './Registration.css';
import {
    Route,
    Switch,
    Redirect,
    withRouter
  } from "react-router-dom"


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: '', email: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    handleSubmit(event) {
        let registration_str = '{"username":"' + this.state.login + '","password":"' + this.state.password + '","email":' + this.state.email + '"}';
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://37.195.44.14:80/api/v1/users/', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(registration_str);
    };

    render() {
        const { history } = this.props
        return (
        <div className="Registration">
            <Switch>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email"
                    value = {this.state.email} onChange={this.handleChange} /><br />
                    <input type="text" name="login"
                    value = {this.state.login} onChange={this.handleChange} /><br />
                    <input type="password" name="password"
                    value = {this.state.password} onChange={this.handleChange} /><br />
                    <input type="submit" value="Зарегистрироваться" />
                </form>
                <Route history={history} path='/App' component={App} />
                <Auth />
            </Switch>
        </div>
        );
    };
};

export default Registration;