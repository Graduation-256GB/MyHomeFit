import React from 'react';
import '../../css/FitNotes/FitnessRank.css';
import Fitness from '../../components/FitNotes/Fitness'
import img1 from "../../images/running.png"
import img2 from "../../images/fitnotes_squat.png"
import img3 from "../../images/fitnotes_handup.png"

const FitnessRank = ({name,array}) => {
    return(
        <div className='rank-fitness-container'>
            <label>{name} 3 Fitness</label>
            <div>
                {
                    array.map(item => (        
                        <div className="fitness-container">
                            <div className="fitness">
                                <img src={item.img}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FitnessRank;