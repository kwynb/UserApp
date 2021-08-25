import React, { Component } from "react";
import PropTypes from 'prop-types';
import { register } from "../services/service";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            birthday: '',
            email: '',
            username: '',
            password: ''
        };
        this.handleFirstNameInput= this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handleBirthDayInput = this.handleBirthDayInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.onRegister = this.onRegister.bind(this);

    }

    handleFirstNameInput(event) {
        this.setState({
            firstname: event.target.value
        })
    }
    handleLastNameInput(event) {
        this.setState({
            lastname: event.target.value
        })
    }
    handleBirthDayInput(event) {
        this.setState({
            birthday: event.target.value
        })
    }
    handleEmailInput(event) {
        this.setState({
            email: event.target.value
        })

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

    onRegister(event) {
        event.preventDefault()
        register(this.state.firstname,
            this.state.lastname,
            this.state.birthday,
            this.state.email,
            this.state.username,
            this.state.password)
            .then(res => console.log(res.data))
            .then(this.props.history.push("/login"))
            .catch(err => console.error(err));

    }

    render(){
        return(
            <div>
                <form onSubmit={this.onRegister}>
                    <label htmlFor="firstname">First Name: </label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Your first name"
                        onChange={this.handleFirstNameInput}
                        required
                    /><br/>
                    <label htmlFor="lastname">Last Name: </label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Your last name"
                        onChange={this.handleLastNameInput}
                        required
                    /><br/>
                    <label htmlFor="birthday">Birthday: </label>
                    <input
                        type="date"
                        id="birthday"
                        placeholder="Your birthday"
                        onChange={this.handleBirthDayInput}
                        required
                    /><br/>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        onChange={this.handleEmailInput}
                        required
                    /><br/>
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}


Register.propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthday: PropTypes.instanceOf(Date),
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string
}
export default Register;