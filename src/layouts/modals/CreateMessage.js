import React, {Component} from 'react';
import "../../styles/Email.css";
import {bindActionCreators} from "redux";
import {onGetUserByEmail} from "../../redux/actions/mailuser-action";
import {onGetEmail} from "../../redux/actions/email-action";
import {connect} from "react-redux";

class CreateMessage extends Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-main">
                    <h3 className="fw-bolder">New Message</h3><hr/>
                    <form className="mb-2">
                        <input
                            type="email"
                            id="recipient"
                            placeholder="Recipient"
                            className="form-control d-inline fw-normal mb-2 mail-body"
                            value={ this.props.mailSet.recipient || ""}
                            onChange={this.props.handleRecipient}
                            required
                        /><br/>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="form-control d-inline fw-normal mb-2 mail-body"
                            value={this.props.mailSet.subject || ""}
                            onChange={this.props.handleSubject}
                            required
                        /><br/>
                        <textarea
                            id="message"
                            placeholder="Message"
                            className="form-control d-inline fw-normal mb-2 mail-body"
                            rows="6"
                            cols="50"
                            value={this.props.mailSet.message || ""}
                            onChange={this.props.handleMessage}
                            required
                        /><br/>
                    </form>
                    <div className="float-end">
                        <button type="submit" className="btn me-2" onClick={this.props.handleDraft}>Save as Draft</button>
                        <button type="submit" className="btn me-2" onClick={this.props.handleSend}>Send</button>
                        <button type="button" className="btn" onClick={this.props.handleClose}>Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);