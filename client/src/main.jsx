import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SocketContextProvider } from "./context/SocketContext";
import store from "./redux/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContextProvider>
  </Provider>
);
