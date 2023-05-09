
export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="post__tags">
      <div className="post__tagsList d-flex-center">
        {tags.slice(0, 3).map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
