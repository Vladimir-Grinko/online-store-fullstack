import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/lux/bootstrap.min.css";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";
import App from "./app/App";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
