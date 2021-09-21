import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onGetEmails} from "../redux/actions/email-action";
import {connect} from "react-redux";
import {onGetUserByEmail} from "../redux/actions/mailuser-action";
import "../styles/Email.css";
import {BsPersonSquare} from "react-icons/bs";

class MailList extends Component {


    render() {
        const time = this.props.data.lastModified.substr(11,15).split(":").reverse();
        const format = () => {
            if (time[2] > 12) {
                return "PM";
            }
            return "AM"
        }
        const creationTime = (time[2] % 12 || 12 ) + ":" + time[1] +format();
        return (
            <div>
                <table className="cursor table table-hover active-tab">
                    <tbody>
                    <tr>
                        <td className="ms-2 mt-0">
                            <BsPersonSquare size="1.2rem" color="rgba(1, 50, 68, 0.76)"/>
                            {/*<input type="checkbox" className="cursor" key={this.props.key}/>*/}
                        </td>
                        <td className="w-100">
                            <h3 className="float-end label text-dark small">{creationTime}</h3>
                            {this.props.chosenMenu === "Inbox" && <h3 className={this.props.data.unread === true ?  "unread label text-black": "label text-black"}>{this.props.data.sender.substr(0,18) + "..."}</h3>}
                            {this.props.chosenMenu !== "Inbox" && <h3 className="label text-black">{this.props.data.recipient.substr(0,18) + "..."}</h3>}
                            <h6 className="label text-secondary small text-space">{this.props.data.text.substr(0,25) + "..."}</h6>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mails: state.emails.emails,
        user: state.users.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetEmails,
        onGetUserByEmail
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MailList);