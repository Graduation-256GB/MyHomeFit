import React from 'react';
import '../../css/MakeYourSetForm/FitnessPicture.css';
import Stretch from '../../images/stretch.png';
import Squat from '../../images/squat.png';

const FitnessPicture = ({name}) =>{
    return (
        <div className="list-img">
            <img src={name}></img>
        </div>
    )
}
export default FitnessPicture;