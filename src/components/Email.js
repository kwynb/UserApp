import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onLogin} from "../redux/actions/login-action";
import {onGetUserByUsername} from "../redux/actions/user-action";
import {onGetUserByEmail} from "../redux/actions/mailuser-action";
import {getUserByEmail, getUserByUsername} from "../services/user-service";
import {
    createMail,
    deleteEmail,
    getDrafts,
    getEmail,
    getReceivedEmails,
    getSentEmails, updateDeliveryStatus,
    updateMail, updateUnreadStatus
} from "../services/mail-service";
import {onGetEmail, onGetSentEmails, onGetReceivedEmails, onGetDrafts} from "../redux/actions/email-action";
import {RiUser3Fill} from "react-icons/ri";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {IoMdAdd} from "react-icons/io";
import {BiFilterAlt} from "react-icons/bi";
import "../styles/Email.css";
import MailList from "./MailList";
import CreateMessage from "../layouts/modals/CreateMessage";
import Mail from "./Mail";
import MailUserProfile from "../layouts/modals/MailUserProfile";
import {DRAFT_STATUS, DRAFTS, INBOX, LATEST, OLDEST, SENT, SENT_STATUS} from "../utils/constants";
import MailSaved from "../layouts/modals/MailSaved";
import MailDeleted from "../layouts/modals/MailDeleted";
import MailSent from "../layouts/modals/MailSent";
import MailError from "../layouts/modals/MailError";

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sender          : '',
            recipient       : '',
            subject         : '',
            message         : '',
            deliveryStatus  : '',

            mailDate    : '',
            mailTime    : '',
            mailDay     : '',

            showCreate  : false,
            showMenu    : false,
            showMailUserProfile: false,
            showMail    : false,
            showFilter  : false,

            response        : '',
            messageSent     : false,
            messageDeleted  : false,
            messageError    : false,

            chosenMenu  : INBOX,
            sort        : LATEST,
            searchTerm  : '',
            loginUser   : localStorage.getItem("id"),
            user        : localStorage.getItem("user"),
            email       : localStorage.getItem("email")
        };
    }

    componentDidMount() {
        getUserByUsername(this.state.user)
            .then((res) => {
                this.props.onGetUserByUsername(res.data); })
            .catch((err) => console.error(err.response));

        if (this.state.chosenMenu === INBOX) {
            getReceivedEmails(this.state.email)
                .then((res) => {
                    this.props.onGetReceivedEmails(res.data); })
                .catch((err) => { console.error(err.response); });
        }
    }

    componentDidUpdate(prevProps, prevState,SS) {
        if (this.state.loginUser !== null) {
            if (prevProps.mails !== this.props.mails) {

                if (this.state.chosenMenu === INBOX) {
                    getReceivedEmails(this.state.email)
                        .then((res) => {
                            this.props.onGetReceivedEmails(res.data); })
                        .catch((err) => { console.error(err.response); });
                }

                if (this.state.chosenMenu === DRAFTS) {
                    getDrafts(this.state.email)
                        .then((res) => {
                            this.props.onGetDrafts(res.data); })
                        .catch((err) => { console.error(err.response); });
                }

                if (this.state.chosenMenu === SENT) {
                    getSentEmails(this.state.email)
                        .then((res) => {
                            this.props.onGetSentEmails(res.data); })
                        .catch((err) => { console.error(err.response); });
                }

            }
        }

        if (localStorage.getItem("id") === null) {
            this.props.history.push("/");
        }
    }

    handleSearch = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleProfile = () => {
        this.props.history.push("/profile");
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
        this.setState({
            deliveryStatus: DRAFT_STATUS
        });
        if (this.props.mail.deliveryStatus === DRAFT_STATUS) {
            updateDeliveryStatus(this.props.mail.id, "")
                .then((res) =>
                    getEmail(res.data.id)
                        .then(res => this.props.onGetEmail(res.data)))
                .catch((err)=> console.error(err.response));
            updateMail(this.props.mail.id,
                this.props.profile.email,
                this.state.recipient,
                this.state.subject,
                this.state.message,
                DRAFT_STATUS).then(() => {
                this.setState( {
                    sender      : '',
                    recipient   : '',
                    subject     : '',
                    message     : '',
                    showMail    : false,
                    showCreate  : false
                })})
                .catch((err) => {
                    this.setState({
                        response    : err.response.data.message,
                        messageError: true,
                        showCreate  : false
                    });
                })
            return
        }
        createMail( this.props.profile.email,
                    this.state.recipient,
                    this.state.subject,
                    this.state.message,
                    DRAFT_STATUS )
            .then(() => {
                this.setState({
                    sender      : '',
                    recipient   : '',
                    subject     : '',
                    message     : '',
                    showCreate  : false
                })
            })
            .catch((err) => {
                this.setState({
                    response    : err.response.data.message,
                    messageError: true,
                    showCreate  : false
                });
            })

    }


    handleSend = () => {
        this.setState({
            deliveryStatus: SENT_STATUS
        });
        if (this.props.deliveryStatus === DRAFT_STATUS) {
            updateMail( this.props.mail.id,
                        this.props.profile.email,
                        this.state.recipient,
                        this.state.subject,
                        this.state.message,
                        SENT_STATUS )
                .then(() => {
                    this.setState( {
                        sender      : '',
                        recipient   : '',
                        subject     : '',
                        message     : '',
                        showCreate  : false,
                        messageSent : true
                    }
                )})
                .catch((err) => {
                    this.setState({
                        response: err.response.data.message,
                        messageError: true,
                        showCreate: false
                    });
                })
            return
        }
        createMail( this.props.profile.email,
                    this.state.recipient,
                    this.state.subject,
                    this.state.message,
                    SENT_STATUS )
            .then(() => {
                this.setState( {
                    sender      : '',
                    recipient   : '',
                    subject     : '',
                    message     : '',
                    showCreate  : false,
                    messageSent : true
                }
            )})
            .catch((err) => {
                this.setState({
                    response    : err.response.data.message,
                    messageError: true,
                    showCreate  : false
                });
            });
    }

    handleClose = () => {
        this.setState({
            recipient       : '',
            sender          : '',
            subject         : '',
            message         : '',
            deliveryStatus  : '',
            messageDeleted  : false,
            messageSent     : false,
            messageError    : false,
            showCreate      : false
        });
    }

    showCreateEmail = () => {
        this.setState({ showCreate: true });
    }

    showInbox = () => {
        this.setState({
            searchTerm  : '',
            chosenMenu  : INBOX,
            sort        : LATEST,
            showMail    : false,
            showMenu    : false
        });
    }

    showDrafts = () => {
        this.setState({
            searchTerm  : '',
            chosenMenu  : DRAFTS,
            sort        : LATEST,
            showMail    : false,
            showMenu    : false
        });
    }

    showSent = () => {
        this.setState({
            searchTerm  : '',
            sort        : LATEST,
            chosenMenu  : SENT,
            showMail    : false,
            showMenu    : false
        });
    }

    showMailUser = () => {
        this.setState({ showMailUserProfile: true });
    }

    hideMailUser = () => {
        this.setState({ showMailUserProfile: false });
    }

    editMail = () => {
        this.setState({
            showCreate  : true,
            recipient   : this.props.mail.recipient,
            sender      : this.props.mail.sender,
            subject     : this.props.mail.subject,
            message     : this.props.mail.text,
        })
    }

    forwardMail = () => {
        this.setState({
            showCreate  : true,
            subject     : this.props.mail.subject,
            message     : `\n\n-------\nForwarded from: <` + this.props.mail.sender + `>\n\n` + this.props.mail.text
        });
    }

    replyMail = () => {
        if (this.props.mail.subject !== "") {
            this.setState({
                subject: `RE: ` + this.props.mail.subject
            });
        }
        this.setState({
            showCreate  : true,
            recipient   : this.props.mail.sender,

        })
    }

    deleteMail = () => {
        deleteEmail(this.props.mail.id)
            .then((res)=>{
                this.setState({
                    showMail    : false,
                    response    : res.data.message,
                    messageDeleted: true,
                })
            }).catch((err) => {
            this.setState({
                showMail    : true,
                response    : err.response.data.message,
                messageError: true
            })
        });

    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu});
    }

    toggleFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    filterOldest = () => {
        this.setState({
            sort        : OLDEST,
            showFilter  : false
        });
    }

    filterLatest = () => {
        this.setState({
            sort        : LATEST,
            showFilter  : false
        });
    }

    exitMail = () => {
        this.setState({
            showMail: false
        });
    }

    filterEmails = (mail) => {
        if (this.state.searchTerm === "") {
            return mail
        }
        if (mail.sender.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return mail
        }
        if (mail.recipient.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return mail
        }
        if (mail.subject.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return mail
        }
        if (mail.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return mail
        }
    }

    sortEmails = (mailA,mailB) => {
        if (this.state.sort === OLDEST) {
            return new Date(mailA.lastModified).getTime() - new Date(mailB.lastModified).getTime()
        }
        return new Date(mailB.lastModified).getTime() - new Date(mailA.lastModified).getTime()
    }

    mapEmails = (mail) => {
       return (
           <div key={mail.id} onClick={() => {
                   this.setState({
                       showMail: true
                   })
                   getEmail(mail.id)
                       .then((res)=> {
                           console.log(res.data);
                           this.props.onGetEmail(res.data);
                       })
                       .catch();
                   if (this.state.chosenMenu === INBOX) {
                   getUserByEmail(mail.sender)
                       .then((res) => {
                            this.props.onGetUserByEmail(res.data); })
                       .catch((err)=> console.error(err.response));
                   updateUnreadStatus(mail.id, false)
                       .then((res) => {
                           getEmail(res.data.id).then(res => this.props.onGetEmail(res.data))})
                       .catch((err)=> console.error(err.response));
               }
               if (this.state.chosenMenu !== INBOX) {
                   getUserByEmail(mail.recipient)
                       .then((res) => {
                            this.props.onGetUserByEmail(res.data); })
                       .catch((err) => console.error(err.response));
               }
               const mailDateTime = mail.lastModified;
               const mailDate = mailDateTime.substr(0, 11).split("/").reverse();
               const dateFormat = new Date(parseInt(mailDate[0]), mailDate[2] - 1, parseInt(mailDate[1])).toLocaleString('en-US', {
                   timeZone: 'Asia/Manila',
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
               });
               const mailDay = new Date(parseInt(mailDate[0]), mailDate[2] - 1, parseInt(mailDate[1])).toLocaleString('en-US', {
                   timeZone: 'Asia/Manila',
                   weekday: 'long'
               });
               const time = mailDateTime.substr(11, 15).split(":").reverse();
               const timeFormat = () => {
                   if (time[2] > 12) {
                       return "PM";
                   }
                   return "AM"
               }
               const mailTime = (time[2] % 12 || 12) + ":" + time[1] + timeFormat();
               this.setState({
                   mailDay: mailDay,
                   mailDate: dateFormat,
                   mailTime: mailTime
               })
           }}>
               <MailList key={mail.id} data={mail} chosenMenu={this.state.chosenMenu}/>
           </div>);
    }


    render() {
        return (
            <div className="mail">
                {this.state.loginUser ?
                    <div className="container email pb-3">
                        {this.state.deliveryStatus === DRAFT_STATUS && <MailSaved handleClose={this.handleClose}/>}
                        {this.state.messageDeleted &&
                            <MailDeleted response={this.state.response} handleClose={this.handleClose}/>}
                        {this.state.messageSent && <MailSent handleClose={this.handleClose}/>}
                        {this.state.messageError &&
                            <MailError responses={{
                                        messageDeleted  : this.state.messageDeleted,
                                        messageSent     : this.state.messageSent
                                        }}
                                       deliveryStatus={this.state.deliveryStatus}
                                       handleClose={this.handleClose}/>}
                        {this.state.showCreate &&
                            <CreateMessage mailSet={{
                                                recipient   : this.state.recipient,
                                                subject     : this.state.subject,
                                                message     : this.state.message
                                            }} handlers={{
                                               handleRecipient  : this.handleRecipient,
                                               handleSubject    : this.handleSubject,
                                               handleMessage    : this.handleMessage,
                                               handleDraft      : this.handleDraft,
                                               handleSend       : this.handleSend,
                                               handleClose      : this.handleClose
                                            }}/>}
                        {this.state.showMailUserProfile && <MailUserProfile/>}
                        <div className="card-body">
                            <h3 className="float-end user mt-2" onClick={this.handleProfile}>
                                <RiUser3Fill size="1.5rem" className="me-2" color="#013244"/>
                                <span className="user-name">{this.props.profile.firstName + " " + this.props.profile.lastName}</span>
                            </h3>
                            <button className="float-end btn mb-2 me-3" onClick={this.showCreateEmail}>
                                <IoMdAdd size="1.5rem"/>
                                <span className="align-bottom word">Compose</span>
                            </button>
                            <form className="form-outline d-inline search">
                                <input type="search" id="form1" className="form-control d-inline fw-bolder"
                                       placeholder="Search" value={this.state.searchTerm || ""} onChange={this.handleSearch}/>
                            </form>
                            <div className="row mt-5 container">
                                <div className="ms-0 col-sm-4">
                                    <div className="head mb-2">Mails</div>
                                    <div className="d-inline">
                                        <button className="float-start chosen" onClick={this.toggleMenu}>{this.state.chosenMenu}</button>
                                        <button className="float-start menu d-inline" onClick={this.toggleMenu}><IoIosArrowDroprightCircle size="1.5rem"/></button>
                                        {this.state.showMenu &&
                                            <div className="mt-2 float-start sidenav">
                                                <h6 className="ms-3 form-label fw-bolder sidenav-menu cursor" onClick={this.showInbox}>Inbox</h6>
                                                <h6 className="ms-3 form-label fw-bolder sidenav-menu cursor" onClick={this.showDrafts}>Drafts</h6>
                                                <h6 className="ms-3 form-label fw-bolder sidenav-menu cursor" onClick={this.showSent}>Sent</h6>
                                            </div>}
                                        <button className="float-end menu d-inline" onClick={this.toggleFilter}><BiFilterAlt /></button>
                                        {this.state.showFilter &&
                                            <div className="mt-2 float-end sidenav me-2">
                                                <h6 className="ms-3 form-label fw-bolder sidenav-menu cursor" onClick={this.filterLatest}>Latest</h6>
                                                <h6 className="ms-3 form-label fw-bolder sidenav-menu cursor" onClick={this.filterOldest}>Oldest</h6>
                                            </div>}
                                    </div>
                                    <div className="scrollbar scrollbar-black mt-2">
                                        {this.props.mails.filter(this.filterEmails).sort(this.sortEmails).map(this.mapEmails)}
                                        {this.props.mails.length === 0 &&
                                        <div className="d-flex justify-content-center">No messages to read.</div>}
                                    </div>
                                </div>
                                <div className="col-sm-8 d-inline-block">
                                    <div className="head mb-2 hide">Mail</div>
                                    <div>
                                        { (this.props.mails.length !== 0 && this.state.showMail) ?
                                            <div>{
                                                    <div>{this.props.mails.length !== 0 &&
                                                        <div className="mt-1">
                                                            <Mail states={{
                                                                    time            : this.state.mailTime,
                                                                    date            : this.state.mailDate,
                                                                    day             : this.state.mailDay,
                                                                    showMail        : this.state.showMail,
                                                                    showMailUser    : this.state.showMailUserProfile,
                                                                    chosenMenu      : this.state.chosenMenu
                                                                }}
                                                                  functions={{
                                                                    showUser        : this.showMailUser,
                                                                    hideUser        : this.hideMailUser,
                                                                    handleClose     : this.exitMail,
                                                                    handleEdit      : this.editMail,
                                                                    handleReply     : this.replyMail,
                                                                    handleDelete    : this.deleteMail,
                                                                    handleForward   : this.forwardMail
                                                                }} />
                                                        </div>}
                                                    </div>
                                            }</div>
                                            : <div className="mt-2 d-flex justify-content-center">
                                                <div className="hide">Click a mail to read.</div>
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
        login   : state.login.user,
        profile : state.users.user,
        mails   : state.emails.emails,
        mail    : state.emails.email,
        mailUser: state.mailUsers.mailUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin,
        onGetUserByUsername,
        onGetDrafts,
        onGetSentEmails,
        onGetReceivedEmails,
        onGetUserByEmail,
        onGetEmail
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);