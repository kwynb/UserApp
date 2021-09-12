import {ON_GET_EMAIL_ACTION,ON_GET_EMAILS_ACTION, ON_GET_RECEIVED_EMAILS_ACTION} from "../actions/email-action";

const getDefaultState = () => ({ emails: [], email: {}});

export const emails = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_GET_EMAILS_ACTION: {
            return Object.assign({}, state, {emails: payload});
        }
        case ON_GET_RECEIVED_EMAILS_ACTION: {
            return Object.assign({}, state, {emails: payload});
        }
        case ON_GET_EMAIL_ACTION: {
            return Object.assign({}, state, {email: payload});
        }
        default: {
            return state;
        }
    }
}