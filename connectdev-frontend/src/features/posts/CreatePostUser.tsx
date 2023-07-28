import { useAppSelector } from "../../app/hooks";
import { UserAvatarSmall } from "./CreatePost";

export default function CreatePostUser() {
    const { user } = useAppSelector((state) => state.login)

    return <div className="create__postUser d-flex-center">
        <UserAvatarSmall avatar={user?.avatar} name={user ? user.name : ""} />
        <p>Create a new post</p>
    </div>
}