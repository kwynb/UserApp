import React, {Component} from 'react';
import {connect} from "react-redux";
import "../styles/Navbar.css";
import {bindActionCreators} from "redux";
import {onGetUserByUsername} from "../redux/actions/user-action";
import {logout} from "../services/user-service";
import {onLogout} from "../redux/actions/login-action";
import {onGetLocalStorage} from "../redux/actions/localstorage-action";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUser: localStorage.getItem("id"),
            user: localStorage.getItem("user"),
            password: localStorage.getItem("password")

        }
    }

    componentDidMount() {
        console.log(this.props.stored);
        if (localStorage.getItem("id") !== null) {
            this.props.onGetLocalStorage(this.state.loginUser);
        }
    }

    onLogout = () => {
        logout(this.state.user, this.state.password)
            .then((res) => {
                this.props.onLogout(res.data);
            }).catch((err) => console.error(err.response));
        this.props.onGetLocalStorage(null);
        localStorage.clear();
    };

    render() {
        return (
            <div>
                <nav className="w-100">
                    <h3 className="brand">Q</h3>
                    <h3 className="navbar-brand ms-2 mt-1">QuickLOG</h3>
                    {this.props.stored !== null &&
                            <div className="d-inline ms-auto">
                                <ul className="align-text-bottom btn-set navbar-expand-lg align-baseline mb-0 cursor" onClick={this.onLogout}>
                                    <li className="ms-0 me-0">Logout</li>
                                </ul>
                            </div>}
                </nav>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        loggedIn: state.login.user.loggedIn,
        profile: state.users.user,
        stored: state.local.stored
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogout,
        onGetUserByUsername,
        onGetLocalStorage
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
