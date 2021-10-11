import axios from "axios";
import {
    CREATE_EMAIL_URL, DELETE_EMAIL_URL,
    DELIVERYSTATUS_URL, GET_DRAFTS_URL,
    GET_EMAILS_URL, GET_RECEIVED_URL, GET_SENT_URL,
    HEADER_CONFIG,
    HEADERS,
    UPDATE_EMAIL_URL
} from "../utils/link-and-configs";

export function createMail(sender, recipient, subject, text, deliveryStatus) {
    const params = JSON.stringify({
            sender          : sender,
            recipient       : recipient,
            subject         : subject,
            text            : text,
            deliveryStatus  : deliveryStatus,
            unread          : true
    })
    return axios.post(CREATE_EMAIL_URL, params, HEADER_CONFIG);

}

export function updateMail(id,sender,recipient,subject, text, deliveryStatus) {
    const params = JSON.stringify({
        sender          : sender,
        recipient       : recipient,
        subject         : subject,
        text            : text,
        deliveryStatus  : deliveryStatus,
        unread          : true
    })
    return axios.put(UPDATE_EMAIL_URL, params, { headers: HEADERS, params: { id }});

}

export function updateDeliveryStatus(id, deliveryStatus) {
    return axios.put(DELIVERYSTATUS_URL, { headers: HEADERS, params: { id, as: deliveryStatus }});
}

export function updateUnreadStatus(id, isUnread) {
    const UNREAD_STATUS_URL = 'http://localhost:8000/emails/set?id='+id+'&isUnread='+isUnread;
    return axios.put(UNREAD_STATUS_URL, HEADER_CONFIG);
}

export function deleteEmail(id) {
    return axios.delete(DELETE_EMAIL_URL, { headers: HEADERS, params: { id }});
}

export function getDrafts(email) {
    return axios.get(GET_DRAFTS_URL, { headers: HEADERS, params: { by: email }});
}

export function getSentEmails(email) {
    return axios.get(GET_SENT_URL, { headers: HEADERS, params: { by: email }});
}

export function getReceivedEmails(email) {
    return axios.get(GET_RECEIVED_URL, { headers: HEADERS, params: { by: email }});
}

export function getEmailList() {
    return axios.get(GET_EMAILS_URL, HEADER_CONFIG);
}

export function getEmail(id) {
    const GET_EMAIL_URL = `http://localhost:8000/emails/get/${id}`;
    return axios.get(GET_EMAIL_URL, HEADER_CONFIG);
}
