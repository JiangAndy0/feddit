import { useEffect, useState } from 'react';
import { getRepliesForPost } from '../api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Reply } from "./Reply.js";

export const Replies = ({ activePost, setShowingReplies }) => {
    const [replies, setReplies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //fetch new replies from Reddit when activePost is changed
    useEffect(() => {

        async function fetchData() {
            setIsLoading(true); //notify Replies that we are awaiting replies
            const replies = await getRepliesForPost(activePost);
            setIsLoading(false); //notify Replies that replies have been fetched
            setReplies(replies);
        }
        fetchData();

    }, [activePost]);

    //setShowingReplies to false when you click the 'x' button
    const handleClick = () => {
        setShowingReplies(false);
    }

    return (
        <div id='replies' className='module'>
            <div className='header'>
                <h3><FontAwesomeIcon icon={faMessage} className='icon'/>{activePost.numComments} comments</h3>
                <button onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div id='comments-container' className={isLoading ? 'loading' : ''}>
                { isLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
                {replies.map( (reply, index) => <Reply reply={reply} key={reply.author + index}/> )}
            </div>

        </div>
    );
}