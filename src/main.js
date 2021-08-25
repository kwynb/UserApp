import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {Provider} from "react-redux";
import reducers from "./redux/reducers";

ReactDOM.render(
    <Provider store={ reducers }>
        <App />
    </Provider>,
    document.getElementById('root')
);