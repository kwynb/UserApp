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
            isLoggedIn: false,
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
                alert("invalid user");
                console.error(err.response);
            });

    }

    handleNewUser = (event) => {
        event.preventDefault();
        this.props.history.push('/register');
    }

    render() {

        return (
            <div className="cover">
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
                                type="password"
                                id="password"
                                placeholder="Your password"
                                className="form-control d-inline fw-bolder"
                                onChange={this.handlePasswordInput}
                                required
                            /><br/>
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

