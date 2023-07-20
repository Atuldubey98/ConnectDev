import Header from "./Header"

export type ContainerProps = {
  children?: React.ReactNode
}
export default function Container(props: ContainerProps) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
