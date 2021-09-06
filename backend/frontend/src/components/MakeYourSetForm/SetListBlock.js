import React from 'react';
import '../../css/MakeYourSetForm/SetListBlock.css';
import FitnessPicture from "./FitnessPicture";
import FitnessCount from './FitnessCount';
import { FiTrash2 } from 'react-icons/fi';

const SetListBlock=({picture,count,removeList})=>{
    return (
        <div className="list">
            <div className="exercise-set-hover" value={ picture} onClick={ removeList}>
                <FiTrash2 value={ picture}/>
            </div>
            <FitnessPicture name={picture}/>
            <FitnessCount name={count }/>
        </div>
    )
}
export default SetListBlock;