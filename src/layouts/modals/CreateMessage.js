import React, {Component} from 'react';
import "../../styles/Email.css";

class CreateMessage extends Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-main cover">
                    <h3 className="fw-bolder">New Message</h3><hr/>
                    <form className="mb-2">
                        <input
                            type="email"
                            id="recipient"
                            placeholder="Recipient"
                            className="form-control d-inline fw-bolder mb-2"
                            value={ this.props.recipient || ""}
                            onChange={this.props.handleRecipient}
                            required
                        /><br/>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="form-control d-inline fw-bolder mb-2"
                            value={this.props.subject || ""}
                            onChange={this.props.handleSubject}
                            required
                        /><br/>
                        <textarea
                            id="message"
                            placeholder="Message"
                            className="form-control d-inline fw-bolder mb-2"
                            rows="6"
                            cols="50"
                            value={this.props.message || ""}
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

export default CreateMessage;