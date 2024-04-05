import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore.js";
import { YMaps } from "@pbe/react-yandex-maps";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <YMaps>
        <App />
      </YMaps>
    </Provider>
  </React.StrictMode>
);
