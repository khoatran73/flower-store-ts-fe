import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto";
import "./index.scss";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
    </React.StrictMode>
);
