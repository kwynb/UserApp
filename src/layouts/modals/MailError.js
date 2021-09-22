import React, {Component} from 'react';
import {DRAFT_STATUS} from "../../utils/constants";
import "../../styles/Modal.css";
class MailError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-main dialog">
                    {this.props.responses.messageDeleted &&
                        <h3 className="fw-bolder">Message Not Deleted</h3>}
                    {this.props.responses.messageSent === false && this.props.deliveryStatus !== DRAFT_STATUS &&
                        <h3 className="fw-bolder">Message Not Sent</h3>}
                    {this.props.deliveryStatus === DRAFT_STATUS &&
                        <h3 className="fw-bolder">Message Not Saved.</h3>}
                    <hr/>
                    {this.props.responses.messageDeleted &&
                        <div>{this.props.responses.response}</div>}
                    <div className="float-end">
                        <button type="button" className="btn" onClick={this.props.handleClose}>Ok</button>
                    </div><br/><br/>
                </div>
            </div>
        );
    }
}

export default MailError;