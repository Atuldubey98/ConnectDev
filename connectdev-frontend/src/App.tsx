import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import ChatsPage from "./features/chats"
import ProfilePage from "./features/profile"

import { TbError404Off } from "react-icons/tb"
import Header from "./features/common/Header"
import Notfound from "./features/common/Notfound"
import LandingPage from "./features/landing"
import LoginPage from "./features/login"
import PrivateRoute from "./features/login/PrivateRoute"
import PostsPage from "./features/posts"
import SinglePostPage from "./features/posts/SinglePostPage"
import ProfileEdit from "./features/profileEdit"
import RegisterPage from "./features/register"
import SearchPage from "./features/search"
import UserSearchPage from "./features/search/UserSearchPage"
import NotificationsPage from "./features/notifications"
import FriendsPage from "./features/friends"

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
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
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
          path="/search/:search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/search/posts/:search"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/search/users/:search"
          element={
            <PrivateRoute>
              <UserSearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/search/users/:user/posts"
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
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <PrivateRoute>
              <FriendsPage />
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
        <Route
          path="*"
          element={<Notfound icon={TbError404Off} message="Not found" />}
        />
      </Routes>

      <ToastContainer />
    </>
  )
}
