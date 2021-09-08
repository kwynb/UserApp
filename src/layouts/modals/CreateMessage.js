import React, {Component} from 'react';

class CreateMessage extends Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-main cover">
                    <h3 className="fw-bolder">New Message</h3><hr/>
                    <form className="mb-2">
                        <input
                            type="text"
                            id="recipient"
                            placeholder="Recipient"
                            className="form-control d-inline fw-bolder mb-2"
                            value={this.state.recipient|| ""}
                            onChange={this.props.handleRecipient}
                            required
                        /><br/>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="form-control d-inline fw-bolder mb-2"
                            value={this.state.subject || ""}
                            onChange={this.props.handleSubject}
                            required
                        /><br/>
                        <textarea
                            type="text"
                            id="message"
                            placeholder="Message"
                            className="form-control d-inline fw-bolder mb-2"
                            rows="6"
                            value={this.state.text || ""}
                            onChange={this.props.handleMessage}
                            required
                        /><br/>
                    </form>
                    <div className="float-end">
                        <button type="submit" className="btn me-2" onClick={this.props.handleSend}>Send</button>
                        <button type="button" className="btn" onClick={this.props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMessage;