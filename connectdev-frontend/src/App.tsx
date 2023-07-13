import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
const ChatsPage = lazy(() => import("./features/chats"))
const ProfilePage = lazy(() => import("./features/profile"))

import { TbError404Off } from "react-icons/tb"
import Header from "./features/common/Header"
const Notfound = lazy(() => import("./features/common/Notfound"))
const LandingPage = lazy(() => import("./features/landing"))
const LoginPage = lazy(() => import("./features/login"))
import PrivateRoute from "./features/login/PrivateRoute"
const PostsPage = lazy(() => import("./features/posts"))
const SinglePostPage = lazy(() => import("./features/posts/SinglePostPage"))
const ProfileEdit = lazy(() => import("./features/profileEdit"))
const RegisterPage = lazy(() => import("./features/register"))
const SearchPage = lazy(() => import("./features/search"))
const UserSearchPage = lazy(() => import("./features/search/UserSearchPage"))
const NotificationsPage = lazy(() => import("./features/notifications"))
const FriendsPage = lazy(() => import("./features/friends"))
import "./App.css"
import FullLoading from "./features/common/FullLoading"
export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<FullLoading />}>
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
            path="/chats/:chatId"
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
      </Suspense>

      <ToastContainer />
    </>
  )
}
