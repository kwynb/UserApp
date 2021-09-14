import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onGetEmails} from "../redux/actions/email-action";
import {connect} from "react-redux";
import {onGetUserByEmail} from "../redux/actions/user-action";
import "../styles/Email.css";

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
                <table className="cursor table table-hover">
                    <tbody>
                    <tr>
                        <td className="mail-select mt-0">
                            <input type="checkbox" className="cursor"/>
                        </td>
                        <td className="w-100">
                            <h3 className="float-end label text-dark small">{creationTime}</h3>
                            {this.props.chosenMenu === "Inbox" && <h3 className="label text-black">{this.props.data.sender.substr(0,18) + "..."}</h3>}
                            {this.props.chosenMenu !== "Inbox" && <h3 className="label text-black">{this.props.data.recipient.substr(0,18) + "..."}</h3>}
                            <h6 className="label text-secondary small">{this.props.data.text.substr(0,25) + "..."}</h6>
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