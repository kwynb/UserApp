import React, {Component} from 'react';
import {RiDeleteBin5Line, RiMapPinUserLine, RiShareForwardLine} from "react-icons/ri";
import {GrFormClose} from "react-icons/gr";
import {ImReply} from "react-icons/im";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onGetUserByEmail} from "../redux/actions/user-action";
import {onGetEmail} from "../redux/actions/email-action";
import "../styles/Mail.css";

class Mail extends Component {

    render() {
        const date = this.props.mail.createdAt.substring(0,11).split("/").reverse();
        const dformat = new Date(date[0], date[2]-1, date[1]).toLocaleString('en-US',{ timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric' });
        const day = new Date(date[0], date[2]-1, date[1]).toLocaleString('en-US',{ timeZone: 'Asia/Manila', weekday: 'long'});
        const time = this.props.mail.createdAt.substring(11,15).split(":").reverse();
        const tformat = () => {
            if (time[2] > 12) {
                return "PM";
            }
            return "AM"
        }
        const creationTime = (time[2] % 12 || 12 ) + ":" + time[1] + tformat();
        return (
            <div className="mt-1">
                <button className="menu float-start" onClick={this.props.handleClose}><GrFormClose size="1.6rem"/></button>
                <button className="menu float-end" onClick={this.props.handleForward}><RiShareForwardLine size="1.3rem"/></button>
                <button className="menu float-end" onClick={this.props.handleDelete}><RiDeleteBin5Line size="1.2rem"/></button>
                <button className="menu float-end" onClick={this.props.handleReply}><ImReply size="1.1rem"/></button>
                <div className="container">
                    <table className="d-flex justify-content-start mt-2">
                        <tbody>
                        <tr>
                            <td>
                                <button className="menu"><RiMapPinUserLine size="3rem"/></button>
                            </td>
                            <td className="d-inline w-50">
                                <h3 className="sender mt-2">{this.props.mailUser.firstName + " " + this.props.mailUser.lastName}</h3>
                                <h3 className="sender-mail text-secondary">{"<" + this.props.mail.sender + ">"}</h3>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="container">
                        <h3 className="mail-body text-dark fw-bold">{this.props.mail.subject}</h3>
                        <p className="mail-body fw-normal text-secondary">{this.props.mail.text}</p>
                        <h3 className="mb-0 sender small float-end">{creationTime +" - "+ day}</h3><br/>
                        <h3 className="mb-0 sender small float-end">{dformat}</h3><br/>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        mailUser: state.mailUsers.mailUser,
        mail: state.emails.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetUserByEmail,
        onGetEmail,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Mail);