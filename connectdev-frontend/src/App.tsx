import { Route, Routes } from "react-router-dom"
import "./App.css"

import { TbError404Off } from "react-icons/tb"
import Header from "./features/common/Header"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppSelector } from "./app/hooks"
import PostsPage from "./features/posts"
import { Suspense, lazy } from "react"
import FullLoading from "./features/common/FullLoading"

const ChatsPage = lazy(() => import("./features/chats"))
const NotFound = lazy(() => import("./features/common/Notfound"))
const FriendsPage = lazy(() => import("./features/friends"))
const LandingPage = lazy(() => import("./features/landing"))
const LoginPage = lazy(() => import("./features/login"))
const PrivateRoute = lazy(() => import("./features/login/PrivateRoute"))
const NotificationsPage = lazy(() => import("./features/notifications"))
const SinglePostPage = lazy(() => import("./features/posts/SinglePostPage"))
const ProfilePage = lazy(() => import("./features/profile"))
const ProfileEdit = lazy(() => import("./features/profileEdit"))
const RegisterPage = lazy(() => import("./features/register"))
const SearchPage = lazy(() => import("./features/search"))
const UserSearchPage = lazy(() => import("./features/search/UserSearchPage"))

export default function App() {
  const { connected } = useAppSelector((state) => state.chats)

  return (
    <>
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
            element={<NotFound icon={TbError404Off} message="Not found" />}
          />
        </Routes>
      </Suspense>
      {connected ? <ToastContainer /> : null}
    </>
  )
}
