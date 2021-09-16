import React, {Component} from "react";
import PropTypes from "prop-types";
import {login} from "../services/user-service";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onLogin} from "../redux/actions/login-action";
import "../styles/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            isLoggedIn: false,
            showError: false
        };
    }

    handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onLogin = (event) => {
        event.preventDefault();
        login(this.state.username, this.state.password)
            .then((res) => {
                if (res.data != null) {
                    this.setState({isLoggedIn: true});
                    this.props.onLogin(res.data);
                    this.props.history.push("/profile");
                }
                this.setState({isLoggedIn: false});
            })
            .catch(err => {
                this.setState({showError: true});
                console.error(err.response);
            });

    }

    handleNewUser = (event) => {
        event.preventDefault();
        this.props.history.push('/register');
    }

    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleClose = () => {
        this.setState({
            showError: false
        })
    }
    render() {

        return (
            <div className="cover">
                {this.state.showError && <div className="modal-backdrop">
                    <div className="modal-main dialog">
                        <h3 className="fw-bolder">Invalid User</h3><hr/>
                        <div>Try again.</div>
                        <div className="float-end">
                            <button type="button" className="btn" onClick={this.handleClose}>Ok</button>
                        </div><br/><br/>
                    </div>
                </div>}
                <h3 className="statement">QuickLOG</h3>
                {this.state.isLoggedIn ? "" :
                <div className="myForm w-100">
                    <form onSubmit={this.onLogin}>
                        <div className="form-group mb-2">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="username"
                                id="username"
                                placeholder="Your username"
                                className="form-control d-inline fw-bolder"
                                onChange={this.handleUsernameInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Password: </label>
                            <input
                                type={this.state.showPassword ? "text": "password"}
                                id="password"
                                placeholder="Your password"
                                className="form-control d-inline fw-bolder"
                                onChange={this.handlePasswordInput}
                                required
                            /><br/>
                        </div>
                        <div className="form-check mb-2">
                            <input type="checkbox" className="form-check-input cursor" id="exampleCheck1" onClick={this.handleShowPassword}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    {this.state.showPassword ? <div className="password">Hide Password</div>
                                        : <div className="password">Show Password</div>}</label>
                        </div>
                        <button type="submit" className="btn mt-2 w-100">Login</button>
                    </form>
                    <div className="mt-3 new align-middle">
                        <hr/>
                        <p className="me-2 d-inline">New User?</p>
                        <button type="submit" className="btn d-inline btn-sm" onClick={this.handleNewUser}>Register</button>
                    </div>
                </div>}
            </div>
        );
    }
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        user: state.login.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin: onLogin,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

