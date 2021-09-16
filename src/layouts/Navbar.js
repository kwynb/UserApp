import React, {Component} from 'react';
import {connect} from "react-redux";
import "../styles/Navbar.css";
import {bindActionCreators} from "redux";
import {logout} from "../services/user-service";
import {onLogout} from "../redux/actions/login-action";
class Navbar extends Component {

    onLogout = () => {
        logout(this.props.user.username, this.props.user.password)
            .then((res) => {
                    this.props.onLogout(res.data);
            }).catch((err) => console.error(err.response));

    };

    render() {
        return (
            <div>
                <nav className="w-100">
                    <h3 className="brand">Q</h3>
                    <h3 className="navbar-brand ms-2 mt-1">QuickLOG</h3>
                    {this.props.user.loggedIn &&
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
        loggedIn: state.login.user.loggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogout: onLogout
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
