import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Picture = ({activePost, setShowingImage}) => {
    const [hasTallImage, setHasTallImage] = useState(false);

    //tells the app to stop showing the image
    const handleClick = () => {
        console.log(activePost);
        setShowingImage(false);
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
        <div id='picture' className='module'>
            <div className='header'>
                <button onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className={hasTallImage ? 'img-container tall' : 'img-container wide'}>
                <img src={activePost.imgURL} onLoad={handleImageLoad}/>
            </div>
        </div>
    );
}