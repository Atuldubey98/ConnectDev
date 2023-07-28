import { AiFillTag } from "react-icons/ai"

export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="post__tags">
      <div className="post__tagsList d-flex-center">
        {tags.map((tag, index) => (
          <span className="d-flex-center" key={index}>
            <AiFillTag />
            <span>{tag}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
