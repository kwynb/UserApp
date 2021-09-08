import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {onGetEmails} from "../redux/actions/email-action";
import {connect} from "react-redux";

class MailList extends Component {
    render() {
        return (
            <div>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <td className="mail-select">
                            <input type="checkbox"/>
                        </td>
                        <td className="w-25">
                            <h3 className="label text-black">{this.props.data.sender}</h3>
                        </td>
                        <td className="w-50">
                            <h3 className="label">{this.props.data.text}</h3>
                        </td>
                        <td className="text-end">
                            <h3 className="mb-0 label">{this.props.data.createdAt.substr(11,5)}</h3>
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
        mails: state.emails.emails
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onGetEmails
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MailList);