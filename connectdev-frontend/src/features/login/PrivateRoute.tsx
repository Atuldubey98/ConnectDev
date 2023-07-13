import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadUser } from "./loginSlice"
import FullLoading from "../common/FullLoading"

interface PrivateRouteProps {
  children: React.ReactNode
}
export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAppSelector((state) => state.login)
  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(loadUser())
    setLoading(false)
  }, [])

  return loading || !user ? <FullLoading /> : <>{children}</>
}
