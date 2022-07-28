import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Reply = ({ reply }) => {
    return (
        <div className="reply">
            <div className='header'>
                <div className="img-container">
                    <img src={reply.authorImg} />
                </div>
                <p className='signature'>{reply.author} {reply.timeAgo} ago</p>
            </div>
            <p className='reply-body'>{reply.body}</p>
            <p className='stat'>
                <FontAwesomeIcon icon={faArrowUp} /> {reply.score} <FontAwesomeIcon icon={faArrowDown} />
            </p>
            <div className='inner-replies-container'>
                <div className='v-line'></div>
                <div className='inner-replies'>
                {reply.replies &&
                    reply.replies.map((reply, index) => <Reply reply={reply} key={reply.author + index} />)
                }
                </div>
            </div>
        </div>
    );
}