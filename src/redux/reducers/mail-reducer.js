import {
    ON_GET_EMAILS_ACTION,
    ON_GET_DRAFTS_ACTION,
    ON_GET_SENT_EMAILS_ACTION,
    ON_GET_RECEIVED_EMAILS_ACTION,
    ON_GET_EMAIL_ACTION
} from "../../utils/on-actions";
const getDefaultState = () => ({ emails: [], email: {}});

export const emails = (state = getDefaultState(), action) => {

    const {type, payload} = action;

    switch (type) {
        case ON_GET_EMAILS_ACTION: {
            return Object.assign({}, state, {emails: payload});
        }
        case ON_GET_DRAFTS_ACTION: {
            return Object.assign({}, state, {emails: payload});
        }
        case ON_GET_SENT_EMAILS_ACTION: {
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