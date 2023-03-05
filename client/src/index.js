import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SocketContextProvider } from "./context/SocketContext";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
