import { formatNum } from "../helperFunctions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Post = ({ post, setActivePost, setShowingReplies, setShowingImage}) => {
    //sets the active post to this post, tells app to show replies module
    const handleCommentClick = () => {
        setActivePost(post);
        setShowingReplies( true );
    }

    //sets the active post to this post, tells app to show Picture module
    const handleImageClick = () => {
        setActivePost(post);
        setShowingImage( true );
    }
    return (
        <div className="post">
            <p>{post.timeAgo} ago by {post.author}</p>
            <h2>{post.title}</h2>
            <div className='img-container'>
                <img src={post.imgPreviewURL} onClick={handleImageClick}/>
            </div>
            <span className='stat'>
                <FontAwesomeIcon icon={faArrowUp}/> {formatNum(post.score)} <FontAwesomeIcon icon={faArrowDown}/>
            </span>
            <button onClick={handleCommentClick} className='stat'><FontAwesomeIcon icon={faMessage} /> {post.numComments}</button>
            <a href={post.url}>See on Reddit</a>
        </div>
    );
}