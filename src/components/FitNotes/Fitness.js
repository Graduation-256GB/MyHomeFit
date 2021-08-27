import React from 'react';
import '../../css/FitNotes/Fitness.css';
import img1 from "../../images/running.png"

const Fitness = (img1, img2, img3) => {
    return(
        <div className="fitness-container">
            <div className="fitness">
                <img src={img1}/>
            </div>
        </div>
    )
}

export default Fitness;