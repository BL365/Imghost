import React from 'react';
import './Auth.css';

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
        let auth_str = '{"username":"' + this.state.login + '","password":"' + this.state.password + '"}';
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://37.195.44.14:80/api/v1/users/login', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(auth_str);
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