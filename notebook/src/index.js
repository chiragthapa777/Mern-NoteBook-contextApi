import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

ReactDOM.render(
  <React.StrictMode>
    <AlertState>
    <AuthState>
      <App />
    </AuthState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById("root")
);
