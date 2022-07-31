import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Picture = ({activePost, setShowingImage, className}) => {

    //tells the app to stop showing the image
    const handleClick = () => {
        setShowingImage(false);
    }


    return (
        <div id='picture' className={className}>
            <div className='header'>
                <button aria-label="Hide Picture" onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className='img-container'>
                <img src={activePost.imgURL} alt="food related to the post"/>
            </div>
        </div>
    );
}