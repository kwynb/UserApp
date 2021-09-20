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

export function getDrafts(email) {
    const baseURL = 'http://localhost:8000/emails/draft';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        params: { by: email }
    });
}

export function getSentEmails(email) {
    const baseURL = 'http://localhost:8000/emails/sent';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        params: { by: email }
    });
}

export function getReceivedEmails(email) {
    const baseURL = 'http://localhost:8000/emails/received';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            params: { by: email }
    });
}

export function deleteEmail(id) {
    const baseURL = `http://localhost:8000/emails/delete?`;
    return axios.delete(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        params: { id }
    });
}

export function createMail(sender,recipient,subject, text, deliveryStatus) {
    const baseURL = 'http://localhost:8000/emails/new';
    const body = JSON.stringify({
        sender: sender,
        recipient: recipient,
        subject: subject,
        text: text,
        deliveryStatus: deliveryStatus,
        unread: true
    })
    return axios.post(baseURL, body, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}});

}

export function updateMail(id,sender,recipient,subject, text, deliveryStatus) {
    const baseURL = 'http://localhost:8000/emails/update';
    const body = JSON.stringify({
        sender: sender,
        recipient: recipient,
        subject: subject,
        text: text,
        deliveryStatus: deliveryStatus,
        unread: true
    })
    return axios.put(baseURL, body, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
        params: { id }
    });

}

export function updateDeliveryStatus(id, deliveryStatus) {
    const baseURL = 'http://localhost:8000/emails/deliver';
    return axios.put(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
        params: { id, deliveryStatus }
    });

}

export function updateUnreadStatus(id, isUnread) {
    const baseURL = 'http://localhost:8000/emails/set?id='+id+'&isUnread='+isUnread;
    return axios.put(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}});

}