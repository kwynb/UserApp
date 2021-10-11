import axios from 'axios';
import {
    DELETE_URL,
    GET_BY_EMAIL_URL,
    GET_BY_USERNAME_URL,
    GET_USERS_URL,
    HEADER_CONFIG,
    HEADERS,
    UPDATE_URL
} from "../utils/link-and-configs";

export function login(username, password) {
    const params = JSON.stringify({
        username    : username,
        password    : password
    })
    return axios.post(LOGIN_URL, params, HEADER_CONFIG);

}

export function logout(username, password) {
    const params = JSON.stringify({
        username    : username,
        password    : password
    })
    return axios.post(LOGOUT_URL, params, HEADER_CONFIG);

}

export function register(firstname, lastname, birthday, email, username, password) {
    const params = JSON.stringify({
        firstName   : firstname,
        lastName    : lastname,
        birthDay    : birthday,
        email       : email,
        username    : username,
        password    : password
    })
    return axios.post(REGISTER_URL, params, HEADER_CONFIG);

}

export function update(id,firstname,lastname,birthday,email,username,password) {
    const params = JSON.stringify({
        firstName   : firstname,
        lastName    : lastname,
        birthDay    : birthday,
        email       : email,
        username    : username,
        password    : password
    })
    return axios.put(UPDATE_URL, params, { headers: HEADERS, params: { id }});

}

export function deleteUser(id) {
    return axios.delete(DELETE_URL, { headers:  HEADERS, params: { id }});
}

export function getUserByUsername(username) {
    return axios.get(GET_BY_USERNAME_URL, { headers: HEADERS, params: { username }});
}

export function getUserByEmail(email) {
    return axios.get(GET_BY_EMAIL_URL, { headers: HEADERS, params: { email }});
}
export function getUser(id) {
    const GET_USER_URL = `http://localhost:8080/users/get/${id}`;
    return axios.get(GET_USER_URL, HEADER_CONFIG);
}

export function getUsers() {
    return axios.get(GET_USERS_URL, HEADER_CONFIG);
}
