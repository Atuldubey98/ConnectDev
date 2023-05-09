import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import FullLoading from "./features/common/FullLoading"
import Header from "./features/common/Header"
import LoginPage from "./features/login"
import PrivateRoute from "./features/login/PrivateRoute"
import RegisterPage from "./features/register"
import ChatsPage from "./features/chats"
const PostsPage = lazy(() => import("./features/posts"))
export default function App() {
  return (
    <>
      <Suspense fallback={<FullLoading />}>
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
      </Suspense>
      <ToastContainer />
    </>
  )
}
