import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import ChatsPage from "./features/chats"
import Header from "./features/common/Header"
import LoginPage from "./features/login"
import PrivateRoute from "./features/login/PrivateRoute"
import PostsPage from "./features/posts"
import RegisterPage from "./features/register"

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <ChatsPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  )
}
