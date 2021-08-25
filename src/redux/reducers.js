import {combineReducers, createStore} from "redux";
import { login } from "./reducers/login-reducer";

const reducers = combineReducers({ login });

export default createStore(reducers);