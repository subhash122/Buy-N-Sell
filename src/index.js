import React from "react";
import ReactDOM from "react-dom";
import { transitions, types, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const options = {
  timeout: 5000,
  offset: "50px",
  transition: transitions.SCALE,
};
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
