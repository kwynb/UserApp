import React, {Component} from 'react';
import "../../styles/Modal.css";

class Deactivation extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="modal-backdrop display-block">
                <div className="modal-main">
                    <h3 className="fw-bolder">Deactivate account?</h3><br/><br/>
                    <div className="float-end">
                    <button type="button" className="btn me-2" onClick={this.props.handleDelete}>Yes</button>
                    <button type="button" className="btn" onClick={this.props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Deactivation;