import React from 'react';
import '../../css/MakeYourSet/FitnessCount.css';

const FitnessCount = ({ name }) => {
    return(
        <div className="list-text">{name}회 반복</div>
    )
}
export default FitnessCount;
