import React from 'react';
import '../../css/FitNotes/RankContent.css'
import { BiTrophy } from 'react-icons/bi';

const UserContent = ({name, proImg,index}) => {
    return(
        <div className="recommend-set-container">
            <div className="rank-number">
                {index}
            </div>
            <div className="profile-img">
                <img src= {proImg}/>
            </div>
            <label className="name">{name}</label>
        </div>
    )
}

export default UserContent;