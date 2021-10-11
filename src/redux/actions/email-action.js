import {
    ON_GET_EMAILS_ACTION,
    ON_GET_DRAFTS_ACTION,
    ON_GET_SENT_EMAILS_ACTION,
    ON_GET_RECEIVED_EMAILS_ACTION,
    ON_GET_EMAIL_ACTION
} from "../../utils/on-actions";

export const onGetEmails = (emails) => {
    return {
        type    : ON_GET_EMAILS_ACTION,
        payload : emails,
    }
}

export const onGetDrafts = (emails) => {
    return {
        type    : ON_GET_DRAFTS_ACTION,
        payload : emails,
    }
}

export const onGetSentEmails = (emails) => {
    return {
        type    : ON_GET_SENT_EMAILS_ACTION,
        payload : emails,
    }
}

export const onGetReceivedEmails = (emails) => {
    return {
        type    : ON_GET_RECEIVED_EMAILS_ACTION,
        payload : emails,
    }
}

export const onGetEmail = (email) => {
    return {
        type    : ON_GET_EMAIL_ACTION,
        payload : email,
    }
}