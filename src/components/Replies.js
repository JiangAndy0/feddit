import { useEffect, useState } from 'react';
import { getRepliesForPost } from '../api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Reply } from "./Reply.js";

export const Replies = ({ activePost, setShowingReplies }) => {
    const [replies, setReplies] = useState([]);
    //fetch new replies from Reddit when activePost is changed
    useEffect(() => {

        async function fetchData() {
            const replies = await getRepliesForPost(activePost);
            setReplies(replies);
        }
        fetchData();

    }, [activePost]);

    //setShowingReplies to false when you click the 'x' button
    const handleClick = () => {
        setShowingReplies(false);
    }

    return (
        <div>
            <div className='header'>
                <span><FontAwesomeIcon icon={faComment}/>{activePost.numComments} comments</span>
                <button onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className='comments-container'>
                {replies.map( (reply, index) => <Reply reply={reply} key={reply.author + index}/> )}
            </div>

        </div>
    );
}