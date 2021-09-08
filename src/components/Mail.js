import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onGetUserByUsername} from "../redux/actions/user-action";
import {onLogin} from "../redux/actions/login-action";
import {connect} from "react-redux";
import {getUserByUsername} from "../services/user-service";
import "../styles/Mail.css";
import {GoMail} from "react-icons/go";
import {onGetEmails} from "../redux/actions/email-action";
import {getEmailList} from "../services/mail-service";
import MailList from "./MailList";

class Mail extends Component {

    // componentDidMount() {
    //     getUserByUsername(this.props.login.username).then((res) => {
    //         this.props.onGetUserByUsername(res.data);
    //     }).catch((err) => console.error(err.response));
    //     getEmailList().then((res) => {
    //         this.props.onGetEmails(res.data);
    //     }).catch((err) => { console.error(err.response);})
    // }

    handleProfile = () => {
        this.props.history.push("/profile");
    }

    render() {
        return (
            <div className="mail">
                {this.props.login.loggedIn ?
                <div className="container pb-3">
                        <div className="card-body">
                            <div className="row gutters-sm justify-content-center">
                                <div className="col col-sm-2 card side mb-3">
                                    <div className="card-body p-md-0">
                                        <div className="create label mb-2">
                                            <h3 className="mb-0 label">Compose</h3>
                                        </div>
                                        <div className="banner mb-2"/>
                                        <div className="row">
                                            <div className="label ms-2 mb-2">
                                                <h3 className="mb-0 label">Inbox</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="label ms-2 mb-2">
                                                <h3 className="mb-0 label">Drafts</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="label ms-2 mb-2">
                                                <h3 className="mb-0 label">Sent</h3>
                                            </div>
                                        </div>
                                        <div className="banner mb-2"></div>
                                        <div className="row">
                                            <div className="mt-4">
                                                <h3 className="d-inline title fw-bolder ms-2 mt-3" onClick={this.handleProfile}>{'  @' + this.props.profile.username}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 card content mb-3 ms-md-3">
                                    <div className="card-body">
                                        {this.props.mails.map((mail) => <MailList key={mail.id} data={mail}/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <div>{this.props.history.push("/")}</div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login.user,
        profile: state.users.user,
        mails: state.emails.emails
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin,
        onGetUserByUsername,
        onGetEmails
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Mail);