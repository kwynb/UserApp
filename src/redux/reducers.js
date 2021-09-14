import {combineReducers, createStore} from "redux";
import { login } from "./reducers/login-reducer";
import {users} from "./reducers/users-reducer";
import {emails} from "./reducers/mail-reducer";
import {mailUsers} from "./reducers/mailuser-reducer";

const reducers = combineReducers({ login, users, mailUsers, emails });

export default createStore(reducers);