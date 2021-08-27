import React from 'react';
import '../../css/FitNotes/RecommendSet.css'

const RecommendSet = ({name}) => {
    return(
        <div className="recommend-set-container">
            <label>SET {name}</label>
        </div>
    )
}

export default RecommendSet;