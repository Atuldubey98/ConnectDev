import "./ChatsScreenHeader.css"
type ChatsScreenHeaderProps = {
  heading: string
}
export default function ChatsScreenHeader(props: ChatsScreenHeaderProps) {
  const { heading } = props
  return (
    <section className="chats__screenHeader">
      <h3>Chats</h3>
    </section>
  )
}
