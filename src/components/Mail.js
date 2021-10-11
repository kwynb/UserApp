import React, {Component} from 'react';
import {RiDeleteBin5Line, RiMapPinUserLine, RiShareForwardLine} from "react-icons/ri";
import {FiEdit2} from "react-icons/fi";
import {GrFormClose} from "react-icons/gr";
import {ImReply} from "react-icons/im";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onGetUserByEmail} from "../redux/actions/mailuser-action";
import {onGetEmail} from "../redux/actions/email-action";
import "../styles/Mail.css";
import MailUserProfile from "../layouts/modals/MailUserProfile";

class Mail extends Component {

    render() {
        return (
            <div className={"mt-1 general" + this.props.states.showMail ? "mail-modal": "hide"}>
                <div className={this.props.states.showMail  ? "mail-top mail-top-hide": "hide"}>Hi</div>
                <button className="menu float-start" onClick={this.props.functions.handleClose}><GrFormClose size="1.6rem"/></button>
                {this.props.states.chosenMenu !== "Drafts" && <button className="menu float-end" onClick={this.props.functions.handleForward}><RiShareForwardLine size="1.3rem"/></button>}
                <button className="menu float-end" onClick={this.props.functions.handleDelete}><RiDeleteBin5Line size="1.2rem"/></button>
                {this.props.states.chosenMenu === "Inbox" && <button className="menu float-end" onClick={this.props.functions.handleReply}><ImReply size="1.1rem"/></button>}
                {this.props.states.chosenMenu === "Drafts" && <button className="menu float-end" onClick={this.props.functions.handleEdit}><FiEdit2 size="1.1rem"/></button>}
                {this.props.states.showMailUser === true && <MailUserProfile handleClose={this.props.functions.handleClose}/>}
                <div className="container">
                        <table className=" d-flex justify-content-start mt-2">
                            <tbody className="mt-5">
                            <tr>
                                <td className="cursor" onMouseOver={this.props.functions.showUser}
                                    onMouseOut={this.props.functions.hideUser}>
                                    <button className="menu cursor"><RiMapPinUserLine size="3rem"/></button>
                                </td>
                                <td className="d-inline w-50">
                                    {this.props.states.chosenMenu === "Inbox" ?
                                    <div>
                                        <h3 className="sender mt-2">{this.props.mailUser.firstName + " " + this.props.mailUser.lastName}</h3>
                                        <h3 className="sender-mail text-secondary">{"<" + this.props.mail.sender + ">"}</h3>
                                    </div>:
                                    <div>
                                        <h3 className="sender mt-2">Recipient:</h3>
                                        <h3 className="sender-mail text-secondary">{"<" + this.props.mail.recipient + ">"}</h3>
                                    </div>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="container">
                            <hr className="mt-0"/>
                            <h3 className="mail-body text-dark fw-bold">{this.props.mail.subject}</h3>
                            <br/>
                            <p className="mail-body fw-normal text-dark space">{this.props.mail.text}</p>
                            <h6 className="mb-0 datetime small float-end">{this.props.states.time +" - "+ this.props.states.day}</h6><br/>
                            <h6 className="mb-0 datetime small float-end">{this.props.states.date}</h6><br/>
                        </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        mailUser  : state.mailUsers.mailUser,
        mail      : state.emails.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetUserByEmail,
        onGetEmail,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Mail);