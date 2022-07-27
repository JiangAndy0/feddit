import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Picture = ({activePost, setShowingImage}) => {

    //tells the app to stop showing the image
    const handleClick = () => {
        console.log(activePost);
        setShowingImage(false);
    }


    return (
        <div id='picture' className='module'>
            <div className='header'>
                <button onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className='img-container'>
                <img src={activePost.imgURL}/>
            </div>
        </div>
    );
}