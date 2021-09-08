export const ON_GET_EMAILS_ACTION = "ON_GET_EMAILS_ACTION";
export const onGetEmails = (emails) => {
    return {
        type: ON_GET_EMAILS_ACTION,
        payload: emails,
    }
}

export const ON_GET_RECEIVED_EMAILS_ACTION = "ON_GET_RECEIVED_EMAILS_ACTION";
export const onGetReceivedEmails = (emails) => {
    return {
        type: ON_GET_RECEIVED_EMAILS_ACTION,
        payload: emails,
    }
}