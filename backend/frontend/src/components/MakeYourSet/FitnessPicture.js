import React from 'react';
import '../../css/MakeYourSet/FitnessPicture.css';
import StretchImg from '../../images/stretch.png';
import SquatImg from '../../images/squat.png';

const FitnessPicture = ({name}) =>{
    return (
        <div className="list-img">
            <img src={SquatImg}></img>
        </div>
    )
}
export default FitnessPicture;