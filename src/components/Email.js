import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onLogin} from "../redux/actions/login-action";
import {onGetUserByEmail, onGetUserByUsername} from "../redux/actions/user-action";
import {getUserByEmail, getUserByUsername} from "../services/user-service";
import {createMail, getEmail, getReceivedEmails} from "../services/mail-service";
import {onGetEmail, onGetReceivedEmails} from "../redux/actions/email-action";
import {RiUser3Fill} from "react-icons/ri";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {IoMdAdd} from "react-icons/io";
import {BiFilterAlt} from "react-icons/bi";
import "../styles/Email.css";
import MailList from "./MailList";
import CreateMessage from "../layouts/modals/CreateMessage";
import Mail from "./Mail";

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
            errorMessage: '',
            showMenu: false,
            viewMail: false,
            chosenMenu: "Inbox"
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

    handleDraft = () => {

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

    showInbox = () => {
        this.setState({chosenMenu: "Inbox"})
    }
    showDrafts = () => {
        this.setState({chosenMenu: "Drafts"})
    }
    showOutbox = () => {
        this.setState({chosenMenu: "Outbox"})
    }
    showSent = () => {
        this.setState({chosenMenu: "Sent"})
    }

    handleReply = () => {

    }

    handleForward = () => {

    }

    deleteMail = () => {

    }

    exitMail = () => {
        this.setState({
            viewMail: false
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
                        {this.state.showCreate && <CreateMessage recipient={this.state.recipient} subject={this.state.subject} message={this.state.message}
                                                                 handleRecipient={this.handleRecipient} handleSubject={this.handleSubject} handleMessage={this.handleMessage}
                                                                 handleDraft={this.handleDraft} handleSend={this.handleSend} handleClose={this.handleClose}/>}
                        <div className="card-body">
                            <h3 className="float-end user mt-2" onClick={this.handleProfile}>
                                <RiUser3Fill size="1.5rem" className="me-2" color="#013244"/><span className="user-name">{this.props.profile.firstName + " " + this.props.profile.lastName}</span></h3>
                            <button className="float-end btn mb-2 me-3" onClick={this.showCreateEmail}> <IoMdAdd size="1.5rem"/> <span className="align-bottom word">Compose</span></button>
                            <form className="form-outline d-inline search">
                                <input type="search" id="form1" className="form-control d-inline fw-bolder"
                                       placeholder="Search" onChange={this.handleSearch}/>
                            </form>
                            <div className="row mt-5 container">
                                <div className="ms-0 col-sm-4 list">
                                    <div className="head mb-2">Mails</div>
                                    <div className="d-inline">
                                        <button className="float-start chosen" onClick={()=>{this.setState({showMenu: !this.state.showMenu})}}>{this.state.chosenMenu}</button>
                                        <button className="float-start menu d-inline" onClick={() => this.setState({showMenu: !this.state.showMenu})}><IoIosArrowDroprightCircle size="1.5rem"/></button>
                                        {this.state.showMenu && <div className="mt-2 float-start sidenav">
                                            <h6 className="ms-3 form-label fw-bolder sidenav-menu" onClick={this.showInbox}>Inbox</h6>
                                            <h6 className="ms-3 form-label fw-bolder sidenav-menu" onClick={this.showDrafts}>Drafts</h6>
                                            <h6 className="ms-3 form-label fw-bolder sidenav-menu" onClick={this.showOutbox}>Outbox</h6>
                                            <h6 className="ms-3 form-label fw-bolder sidenav-menu" onClick={this.showSent}>Sent</h6>
                                        </div>}
                                        <button className="float-end menu d-inline"><BiFilterAlt/></button>
                                    </div>
                                    <div className="scrollbar scrollbar-black mt-2">
                                        {this.props.mails.map((mail) => <div onClick={() => {
                                            this.setState({
                                                viewMail: true
                                            })
                                            getEmail(mail.id)
                                                .then((res)=> {console.log(res.data);
                                                    this.props.onGetEmail(res.data)})
                                                .catch((err)=> console.error(err.response));
                                            getUserByEmail(mail.sender).then((res) => {
                                                console.log(res.data);
                                                this.props.onGetUserByEmail(res.data);
                                            }).catch((err)=> console.error(err.response));
                                        }}><MailList key={mail.id} data={mail}/></div>)}
                                    </div>
                                </div>
                                <div className="col-sm-8 d-inline-block">
                                    <div className="head mb-2">Mail</div>
                                    <div>
                                        { this.state.viewMail ? <Mail handleClose={this.exitMail}
                                                                      handleReply={this.handleReply}
                                                                      handleDelete={this.deleteMail}
                                                                      handleForward={this.handleForward}/>
                                            :<div className="mt-2 d-flex justify-content-center">
                                                <div>Click a mail to read.</div>
                                            </div>
                                        }
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
        mails: state.emails.emails,
        mail: state.emails.mail
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin,
        onGetUserByUsername,
        onGetReceivedEmails,
        onGetUserByEmail,
        onGetEmail
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);