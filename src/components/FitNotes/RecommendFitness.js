import React from 'react';
import '../../css/FitNotes/RecommendFitness.css';
import '../../components/FitNotes/RecommendSet'
import RecommendSet from "./RecommendSet";

const RecommendFitness = ({name}) =>{
    return(
        <div className="recommend-fitness-container">
            <label>Recommend for {name}</label>
            <RecommendSet name="1"/>
            <RecommendSet name="2"/>
            <RecommendSet name="3"/>
        </div>
    )
}

export default RecommendFitness;