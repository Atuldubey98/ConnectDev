import React from "react"
import { Link } from "react-router-dom"
import TextTruncate from "react-text-truncate"

type PostBodyProps = {
  text: string
  name: string
  title: string
}

export default function PostBody({ text, name, title }: PostBodyProps) {
  return (
    <div className="post__body">
      <div className="post__about">
        <TextTruncate text={title} element={"h3"} truncateText="..." line={2} />
        <Link to={"#"}>
          <p>{name}</p>
        </Link>
      </div>
      <TextTruncate text={text} element={"p"} truncateText="..." line={5} />
    </div>
  )
}
