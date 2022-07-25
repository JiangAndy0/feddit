import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Reply = ({ reply }) => {
    return (
        <div className="reply">
            <div className="left-pane">
                <div className="img-container">
                    <img src={reply.authorImg} />
                </div>
                <div className='h-line'></div>
            </div>
            <div className="right-pane">
                <div className='signature-container'>
                    <p className='signature'>{reply.author} {reply.timeAgo} ago</p>
                </div>
                <p className='reply-body'>{reply.body}</p>
                <p className='stat'><FontAwesomeIcon icon={faArrowUp} /> {reply.score} <FontAwesomeIcon icon={faArrowDown} /></p>
                {reply.replies && 
                    reply.replies.map( (reply, index) => <Reply reply={reply} key={reply.author + index}/>)
                }
            </div>
            
        </div>
    );
}