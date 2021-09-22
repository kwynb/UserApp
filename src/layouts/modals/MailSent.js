import React, {Component} from 'react';
import "../../styles/Modal.css";

class MailSent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-main dialog">
                    <h3 className="fw-bolder">Message Sent</h3>
                    <div className="float-end">
                        <button type="button" className="btn" onClick={this.props.handleClose}>Ok</button>
                    </div><br/><br/>
                </div>
            </div>
        );
    }
}

export default MailSent;