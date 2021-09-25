import React from 'react';
import '../../css/FitNotes/RecommendFitness.css';
import '../../components/FitNotes/RecommendSet'
import RecommendSet from "./RecommendSet";

const RecommendFitness = ({name, nameList, imgList}) =>{
    return(
        <div className="recommend-fitness-container">
            {/*<label>Recommend for {name}</label>*/}
            <label>{name}</label>
            {/*<RecommendSet name="1"/>
            <RecommendSet name="2"/>
            <RecommendSet name="3"/>*/}
            <RecommendSet name={nameList[0]} rank="1 th" proImg={imgList[0]}/>
            <RecommendSet name={nameList[1]} rank="2 th" proImg={imgList[1]}/>
            <RecommendSet name={nameList[2]} rank="3 th" proImg={imgList[2]}/>
        </div>
    )
}

export default RecommendFitness;