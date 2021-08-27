import React from 'react';
import '../../css/FitNotes/FitnessRank.css';
import Fitness from '../../components/FitNotes/Fitness'
import img1 from "../../images/running.png"
import img2 from "../../images/fitnotes_squat.png"
import img3 from "../../images/fitnotes_handup.png"
import Calories from "../../images/FitCalories.JPG"
import Calender from "../../pages/Calender";

const FitnessRank = ({name}) => {
    return(
        <div className='rank-fitness-container'>
            <img src={Calories}/>
        </div>
    )
}

export default FitnessRank;