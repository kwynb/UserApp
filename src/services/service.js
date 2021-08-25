import axios from 'axios';

export function login(username,password) {
    const baseURL = 'http://localhost:8080/users/login';
    const body = JSON.stringify({
        username : username,
        password : password
    })
    return axios.post(baseURL, body, { headers: {
        'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}});

}

export function register(firstname,lastname,birthday,email,username,password) {
    const baseURL = 'http://localhost:8080/users/save';
    const body = JSON.stringify({
        firstName : firstname,
        lastName : lastname,
        birthDay : birthday,
        email : email,
        username : username,
        password : password
    })
    return axios.post(baseURL, body, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}});

}

export function getUser(id) {
    const baseURL = `http://localhost:8080/users/get/${id}`;
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json' }});
}

export function getUsers() {
    const baseURL = 'http://localhost:8080/users/get';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json' }});
}
