import TextTruncate from "react-text-truncate"

export default function PostTitle({ title }: { title: string }) {
  return (
    <TextTruncate text={title} element={"h3"} truncateText="..." line={2} />
  )
}
