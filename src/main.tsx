import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import "./configs/i18n";
import keycloakService from "./configs/keycloakService.ts";

const render = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
};
keycloakService.initKeycloak(render);
