import React from 'react';
import '../../css/FitNotes/RankContent.css'
import { BiTrophy } from 'react-icons/bi';

const SetContent = ({title}) => {
    return(
        <div className="recommend-set-container">
            <label className="name">{title}</label>
        </div>
    )
}

export default SetContent;