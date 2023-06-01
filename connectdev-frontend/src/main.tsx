import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import WebsocketContextProvider from "./features/context/WebsocketContext"
Modal.setAppElement("#root")

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <WebsocketContextProvider>
        <App />
      </WebsocketContextProvider>
    </Provider>
  </BrowserRouter>,
)
