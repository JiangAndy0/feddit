import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Reply = ({ reply }) => {
    return (
        <div>
            <img src={reply.authorImg} />
            <p>{reply.author} {reply.timeAgo} ago</p>
            <p>{reply.body}</p>
            <p><FontAwesomeIcon icon={faArrowUp} /> {reply.score} <FontAwesomeIcon icon={faArrowDown} /></p>
            {reply.replies && 
                reply.replies.map( (reply, index) => <Reply reply={reply} key={reply.author + index}/>)
            }
        </div>
    );
}