import './DummyPost.css'
export default function DummyPost() {
    return <li className="dummy__postWrapper post__wrapper">
        <div className="dummy__postBody post__body">
            <div className="dummy__postText"></div>
            <div className="dummy__postText"></div>
            <div className="dummy__postText"></div>
        </div>
        <div className="dummy__postTags post__tags"></div>
        <div className="dummy__postTags post__btns"></div>
    </li>
}