import { useState } from "react";
import { formatNum } from "../helperFunctions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Post = ({ post, setActivePost, setShowingReplies, setShowingImage}) => {
    const [hasTallImage, setHasTallImage] = useState(false);

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

    //determine if the post's image is a portrait photo
    const handleImageLoad = ({ target:img }) => {
        const {offsetHeight, offsetWidth} = img;
        console.log(offsetHeight);
        if (offsetHeight > offsetWidth) {
            setHasTallImage(true);
        }
    }

    return (
        <div className="post">
            <p className='signature'>{post.timeAgo} ago by {post.author}</p>
            <h2>{post.title}</h2>
            <div className={hasTallImage ? 'img-container tall' : 'img-container wide'}>
                <img 
                    src={post.imgPreviewURL} 
                    onClick={handleImageClick}
                    onLoad={handleImageLoad}
                />
            </div>
            <div className='bottom-bar'>
                <span className='stat'>
                    <FontAwesomeIcon icon={faArrowUp}/> {formatNum(post.score)} <FontAwesomeIcon icon={faArrowDown}/>
                </span>
                <button onClick={handleCommentClick} className='stat'>
                    <FontAwesomeIcon icon={faMessage} /> {post.numComments}
                </button>
                <a href={post.url}>See on Reddit</a>
            </div>
        </div>
    );
}