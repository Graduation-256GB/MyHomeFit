import React from 'react';
import '../../css/MakeYourSetForm/FitnessPicture.css';

const FitnessPicture = ({name}) =>{
    return (
        <div className="list-img">
            <img src={name}></img>
        </div>
    )
}
export default FitnessPicture;