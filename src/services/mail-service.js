import axios from "axios";

export function getEmailList() {
    const baseURL = 'http://localhost:8000/emails/get';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }});
}

export function getEmail(id) {
    const baseURL = `http://localhost:8000/emails/get/${id}`;
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }});
}

export function getReceivedEmails(email) {
    const baseURL = 'http://localhost:8000/emails/received';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            params: { by: email }
    });
}

export function createMail(sender,recipient,subject, text) {
    const baseURL = 'http://localhost:8000/emails/new';
    const body = JSON.stringify({
        sender: sender,
        recipient: recipient,
        subject: subject,
        text: text,
        unread: true
    })
    return axios.post(baseURL, body, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}});

}