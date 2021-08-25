import React, { Component } from "react";
import PropTypes from "prop-types";
import { login } from "../services/service";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
        };

        this.handleUsernameInput =
            this.handleUsernameInput.bind(this);
        this.handlePasswordInput =
            this.handlePasswordInput.bind(this);
        this.onLogin =
            this.onLogin.bind(this);
        this.handleNewUser =
            this.handleNewUser.bind(this);
    }
    handleUsernameInput(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordInput(event) {
        this.setState({
            password: event.target.value
        })
    }

    onLogin(event) {
        event.preventDefault()
        console.log(this.state.username);
        console.log(this.state.password);
        login(this.state.username, this.state.password)
            .then(res => { this.setState({
                username: res.data.username,
                password: res.data.password,
                isLoggedIn: res.data.loggedIn
            })
                console.log(res.data.loggedIn);
            })
            .then(this.props.history.push("/welcome"))
            .catch(err => console.error(err.response))

    }

    handleNewUser(event) {
        event.preventDefault();
        this.props.history.push('/register');
    }
    render(){

        return(
            <div>
                <form onSubmit={this.onLogin}>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="username"
                        id="username"
                        placeholder="Your username"
                        onChange={this.handleUsernameInput}
                        required
                    /><br/>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        onChange={this.handlePasswordInput}
                        required
                    /><br/>
                    <button type="submit">Login </button>
                </form>
                <button onClick={this.handleNewUser}>New User</button>

            </div>
        );
    }
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool
}
export default Login;