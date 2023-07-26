import { ToastContainer } from "react-toastify"
import Header from "./Header"
import "react-toastify/dist/ReactToastify.css"

export type ContainerProps = {
  children?: React.ReactNode
}
export default function Container(props: ContainerProps) {
  return (
    <>
      <Header />
      {props.children}
      <ToastContainer />
    </>
  )
}
