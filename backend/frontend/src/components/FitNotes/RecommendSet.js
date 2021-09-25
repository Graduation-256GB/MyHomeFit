import React from 'react';
import '../../css/FitNotes/RecommendSet.css'
import { BiTrophy } from 'react-icons/bi';

const RecommendSet = ({name, rank, proImg}) => {
    return(
        <div className="recommend-set-container">
            {/*<label>SET {name}</label>*/}
            <div className="ranking">
                < BiTrophy className="trophy"/>
                <label>{rank}</label>
            </div>
            <div className="profile-img">
                <img src= {proImg}/>
            </div>
            <label className="name">{name}</label>
        </div>
    )
}

export default RecommendSet;