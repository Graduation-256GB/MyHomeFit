import React from 'react';
import '../../css/MakeYourSetForm/SetListBlock.css';
import FitnessPicture from "./FitnessPicture";
import FitnessCount from './FitnessCount';
import { FiTrash2 } from 'react-icons/fi';

const ListBlock=({name})=>{
    return (
        <div className="list">
            <div className="exercise-set-hover">
                <FiTrash2/>
            </div>
            <FitnessPicture name={name}/>
            <FitnessCount name="10"/>
        </div>
    )
}
export default ListBlock;