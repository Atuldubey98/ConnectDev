import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import ChatsPage from "./features/chats"
import ProfilePage from "./features/profile"

import Header from "./features/common/Header"
import LoginPage from "./features/login"
import PrivateRoute from "./features/login/PrivateRoute"
import PostsPage from "./features/posts"
import RegisterPage from "./features/register"
import LandingPage from "./features/landing"
import ProfileEdit from "./features/profileEdit"
import SinglePostPage from "./features/posts/SinglePostPage"

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
          path="/posts/:postId"
          element={
            <PrivateRoute>
              <SinglePostPage />
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
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  )
}
