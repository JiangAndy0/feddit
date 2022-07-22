import { formatNum } from "../helperFunctions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Post = ({ post }) => {
    return (
        <div className="post">
            <p>{post.timeAgo} ago by {post.author}</p>
            <h1>{post.title}</h1>
            <img src={post.imgPreviewURL} />
            <span>
                <FontAwesomeIcon icon={faArrowUp}/> {formatNum(post.score)} <FontAwesomeIcon icon={faArrowDown}/>
            </span>
            <button><FontAwesomeIcon icon={faMessage} /> {post.numComments}</button>
            <a href={post.url}>See on Reddit</a>
        </div>
    );
}