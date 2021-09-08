import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onLogin} from "../redux/actions/login-action";
import {onGetUserByUsername} from "../redux/actions/user-action";
import {connect} from "react-redux";
import {getUserByUsername} from "../services/user-service";
import {createMail, getReceivedEmails} from "../services/mail-service";
import {RiUser3Fill} from "react-icons/ri";
import "../styles/Email.css";
import {IoMdAdd} from "react-icons/io";
import MailList from "./MailList";
import {onGetReceivedEmails} from "../redux/actions/email-action";
class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
            sender: '',
            recipient: '',
            subject: '',
            message: '',
            messageSent: false,
            messageError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        getUserByUsername(this.props.login.username).then((res) => {
            this.props.onGetUserByUsername(res.data);
        }).catch((err) => console.error(err.response));
        getReceivedEmails(this.props.profile.email).then((res) => {
            this.props.onGetReceivedEmails(res.data);
        }).catch((err) => { console.error(err.response);})
    }

    handleSearch = (event) => {
        this.setState({
            search: event.target.value
        });
    }

    handleProfile = () => {
        this.props.history.push("/profile");
    }

    showCreateEmail = () => {
        this.setState({
            showCreate: true
        })
    }

    handleRecipient = (event) => {
        this.setState({
            recipient: event.target.value
        });
    }

    handleSubject = (event) => {
        this.setState({
            subject: event.target.value
        });
    }

    handleMessage = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    handleSend = () => {
        createMail(this.props.profile.email,
             this.state.recipient,
             this.state.subject,
             this.state.message)
            .then((res) => {
                console.log(res.data);
                this.setState( {
                    sender: '',
                    recipient: '',
                    subject: '',
                    message: '',
                    messageSent: true,
                    showCreate: false
                })})
            .catch((err) => {
                this.setState({
                    errorMessage: err.response.data.message,
                    messageError: true,
                    showCreate: false
                });
            })
    }

    handleClose = () => {
        this.setState({
            messageSent: false,
            messageError: false,
            showCreate: false
        })
    }

    render() {
        return (
            <div className="mail">
                {this.props.login.loggedIn ?
                    <div className="container email pb-3">
                        {this.state.messageSent && <div className="modal-backdrop">
                            <div className="modal-main cover success">
                                <h3 className="fw-bolder">Message Sent </h3>
                                <div className="float-end">
                                    <button type="button" className="btn" onClick={this.handleClose}>Ok</button>
                                </div>
                            </div>
                        </div>}
                        {this.state.messageError && <div className="modal-backdrop">
                            <div className="modal-main cover success">
                                <h3 className="fw-bolder">Message Not Sent</h3>
                                <hr/>
                                <div>{this.state.errorMessage}</div>
                                <div className="float-end">
                                    <button type="button" className="btn" onClick={this.handleClose}>Ok</button>
                                </div>
                            </div>
                        </div>}
                        {this.state.showCreate && <div className="modal-backdrop">
                            <div className="modal-main cover">
                                <h3 className="fw-bolder">New Message</h3><hr/>
                                <form className="mb-2">
                                    <input
                                        type="email"
                                        id="recipient"
                                        placeholder="Recipient"
                                        className="form-control d-inline fw-bolder mb-2"
                                        value={this.state.recipient|| ""}
                                        onChange={this.handleRecipient}
                                        required
                                    /><br/>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Subject"
                                        className="form-control d-inline fw-bolder mb-2"
                                        value={this.state.subject || ""}
                                        onChange={this.handleSubject}
                                        required
                                    /><br/>
                                    <textarea
                                        id="message"
                                        placeholder="Message"
                                        className="form-control d-inline fw-bolder mb-2"
                                        rows="6"
                                        cols="50"
                                        value={this.state.message || ""}
                                        onChange={this.handleMessage}
                                        required
                                    /><br/>
                                </form>
                                <div className="float-end">
                                    <button type="submit" className="btn me-2" onClick={this.handleSend}>Send</button>
                                    <button type="button" className="btn" onClick={this.handleClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        }
                        <div className="card-body">
                            <h3 className="float-end user mt-2" onClick={this.handleProfile}>
                                <RiUser3Fill size="1.5rem" className="me-2" color="#013244"/><span className="user-name">{this.props.profile.firstName + " " + this.props.profile.lastName}</span></h3>
                            <button className="float-end btn mb-2 me-3" onClick={this.showCreateEmail}> <IoMdAdd size="1.5rem"/> <span className="align-bottom word">Compose</span></button>
                            <form className="form-outline d-inline search">
                                <input type="search" id="form1" className="form-control d-inline fw-bolder"
                                       placeholder="Search" onChange={this.handleSearch}/>
                            </form>
                            <div className="sidenav">
                                <h6 className="ms-3 form-label fw-bolder">Inbox</h6>
                                <h6 className="ms-3 form-label fw-bolder">Drafts</h6>
                                <h6 className="ms-3 form-label fw-bolder">Sent</h6>
                            </div>
                            <div className="row mt-5 container">
                                {/*<div className="col-md-3 sidenav">*/}
                                {/*    <div className="head mb-2">Menu</div>*/}
                                {/*    <h6 className="ms-3 form-label fw-bolder">Inbox</h6>*/}
                                {/*    <h6 className="ms-3 form-label fw-bolder">Drafts</h6>*/}
                                {/*    <h6 className="ms-3 form-label fw-bolder">Sent</h6>*/}
                                {/*</div>*/}
                                <div className="col-md-9 list">
                                    <div className="head mb-2">Menu</div>
                                        {this.props.mails.map((mail) => <MailList key={mail.id} data={mail}/>)}
                                </div>
                            </div>
                            {/*<div className="mt-5 container">*/}
                            {/*    {this.props.mails.map((mail) => <MailList key={mail.id} data={mail}/>)}*/}
                            {/*</div>*/}
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
        onGetReceivedEmails
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);