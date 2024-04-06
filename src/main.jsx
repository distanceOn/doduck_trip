import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore.js";
import { YMaps } from "@pbe/react-yandex-maps";

const APY_KEY = "35a2495a-f089-4d95-8a2b-e6d31bf23853";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <YMaps apiKey={APY_KEY}>
        <App />
      </YMaps>
    </Provider>
  </React.StrictMode>
);
