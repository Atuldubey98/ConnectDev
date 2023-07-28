import { memo } from "react";
import { IoCloseOutline } from "react-icons/io5";

export type Tag = {
    tag: string; id: string;
}
export type FormPostTagsListProps = {
    tags: Tag[],
    onRemoveTag: (id: string) => void
}
function FormPostTagsList(props: FormPostTagsListProps) {
    return props.tags.length > 0 ? (
        <div className="tags__list ">
            {props.tags.map((tag) => (
                <span key={tag.id}>
                    {tag.tag}{" "}
                    <IoCloseOutline onClick={() => props.onRemoveTag(tag.id)} />
                </span>
            ))}
        </div>
    ) : null
}

export default memo(FormPostTagsList);