// -------------- USERS ---------------
export const LOGIN_URL      = "http://localhost:8080/users/login";
export const LOGOUT_URL     = "http://localhost:8080/users/logout";

export const REGISTER_URL   = "http://localhost:8080/users/save";
export const UPDATE_URL     = "http://localhost:8080/users/update";
export const DELETE_URL     = "http://localhost:8080/users/delete?";

export const GET_BY_USERNAME_URL    = "http://localhost:8080/users/get/username?";
export const GET_BY_EMAIL_URL       = "http://localhost:8080/users/get/email?";
export const GET_USERS_URL          = "http://localhost:8080/users/get";

// -------------- EMAILS ---------------
export const GET_EMAILS_URL         = "http://localhost:8000/emails/get";
export const CREATE_EMAIL_URL       = "http://localhost:8000/emails/new";
export const UPDATE_EMAIL_URL       = "http://localhost:8000/emails/update";
export const DELETE_EMAIL_URL       = "http://localhost:8000/emails/delete?";
export const DELIVERYSTATUS_URL     = "http://localhost:8000/emails/deliver?";

export const GET_DRAFTS_URL         = "http://localhost:8000/emails/draft";
export const GET_SENT_URL           = "http://localhost:8000/emails/sent";
export const GET_RECEIVED_URL       = "http://localhost:8000/emails/received?";

export const HEADERS    = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
}

export const HEADER_CONFIG = { headers: HEADERS };

