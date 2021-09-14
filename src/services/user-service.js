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

export function logout(username,password) {
    const baseURL = 'http://localhost:8080/users/logout';
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

export function update(id,firstname,lastname,birthday,email,username,password) {
    const baseURL = `http://localhost:8080/users/update`;
    const body = JSON.stringify({
        firstName : firstname,
        lastName : lastname,
        birthDay : birthday,
        email : email,
        username : username,
        password : password
    })
    return axios.put(baseURL, body, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            params: { id }
    });

}

export function deleteUser(id) {
    const baseURL = `http://localhost:8080/users/delete?`;
    return axios.delete(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            params: { id }
    });
}

export function getUser(id) {
    const baseURL = `http://localhost:8080/users/get/${id}`;
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }});
}

export function getUserByUsername(username) {
    const baseURL = `http://localhost:8080/users/get/username?`;
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            params: { username }
    });
}
export function getUserByEmail(email) {
    const baseURL = 'http://localhost:8080/users/get/email?';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        params: { email }
    });
}

export function getUsers() {
    const baseURL = 'http://localhost:8080/users/get';
    return axios.get(baseURL, { headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }});
}
